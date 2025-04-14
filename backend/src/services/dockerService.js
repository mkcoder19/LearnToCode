const Docker = require('dockerode');
const path = require('path');
const fs = require('fs');

let docker;
try {
    docker = new Docker();
} catch (err) {
    console.error('Docker connection error:', err.message);
    docker = null;
}

class DockerService {
    static async executeCode(language, code) {
        if (!docker) {
            return { 
                success: false, 
                error: 'Docker service is not available. Please ensure Docker Desktop is running.' 
            };
        }

        try {
            // Create temp directory
            const tempDir = path.join(__dirname, '../../temp');
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir);
            }

            // Write code to file
            const fileName = this.getFileName(language);
            const filePath = path.join(tempDir, fileName);
            fs.writeFileSync(filePath, code);

            // Get or build image
            const imageName = this.getImageName(language);
            try {
                await docker.getImage(imageName).inspect();
            } catch {
                // Build image if it doesn't exist
                const dockerfilePath = path.join(__dirname, `../../docker/Dockerfile.${language}`);
                const stream = await docker.buildImage({
                    context: path.dirname(dockerfilePath),
                    src: [`Dockerfile.${language}`]
                }, { t: imageName });
                await new Promise((resolve, reject) => {
                    docker.modem.followProgress(stream, (err) => err ? reject(err) : resolve());
                });
            }

            // Run container
            const container = await docker.run(
                imageName,
                this.getCommand(language, fileName),
                process.stdout,
                {
                    HostConfig: {
                        AutoRemove: true,
                        Binds: [
                            `${tempDir}:/app`
                        ]
                    }
                }
            );

            return { success: true, output: container.output };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static getFileName(language) {
        const extensions = {
            'python': 'script.py',
            'java': 'Main.java',
            'cpp': 'main.cpp',
            'javascript': 'script.js'
        };
        return extensions[language];
    }

    static getImageName(language) {
        return `code-exec-${language}`;
    }

    static getCommand(language, fileName) {
        const commands = {
            'python': ['python', fileName],
            'java': ['javac', fileName, '&&', 'java', 'Main'],
            'cpp': ['g++', fileName, '-o', 'main', '&&', './main'],
            'javascript': ['node', fileName]
        };
        return commands[language];
    }
}

module.exports = DockerService;

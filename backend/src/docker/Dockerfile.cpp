FROM gcc:latest

WORKDIR /app

COPY . .

CMD ["g++", "main.cpp", "-o", "main", "&&", "./main"]

FROM postgres:13

ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=messenger

EXPOSE 5432
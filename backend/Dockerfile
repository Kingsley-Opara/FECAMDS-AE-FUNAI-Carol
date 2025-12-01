# CREATING THE DOCKER IMAGE
FROM python:3.11-slim

# PREVENTING PYTHON FROM WRITING BYTE CODE

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# COPY THE PYTHON FILE INTO A FOLDER CALLED APP

COPY . /app

# UPDATING THE LINUX SYSTEM
RUN apt-get update && apt-get install -y

# CHANGING THE WORING DIR TO APP

WORKDIR /app

# Creating python dependices
RUN python -m venv /opt/venv

# INSTALLING ALL PYTHON DEPENDICES

RUN /opt/venv/bin/pip install pip --upgrade && \ 
    /opt/venv/bin/pip install -r requirements.txt --upgrade




EXPOSE 8000

WORKDIR /app/src

CMD ["/opt/venv/bin/gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "4"]

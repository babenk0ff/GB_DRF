FROM python:3.8.6
RUN pip3 install --upgrade pip
WORKDIR /app
COPY . .
RUN pip3 install -r requirements.txt
RUN pip3 install gunicorn

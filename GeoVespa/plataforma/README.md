await strapi.plugins['email'].services.email.send({
to: 'valid email address',
from: 'your verified email address', //e.g. single sender verification in SendGrid
cc: 'valid email address',
bcc: 'valid email address',
replyTo: 'valid email address',
subject: 'The Strapi Email plugin worked successfully',
text: 'Hello world!',
html: 'Hello world!',
}),

docker

docker build . -t geovespa

<<<<<<< HEAD
docker run -d -p80:80 geovespa

docker run -d -p1337:1337 geovespa
=======
pass:CIM-ttm@2023

  docker build . -t geovespa

  docker run -d -p80:80 geovespa


  admin

  email:no-reply@cim-ttm.pt
  pass:CIM-ttm@2023


  user:
  email:vespa@test.com
  pass:CIM-ttm@2023


distrito	concelho	Dia	Mês	Ano	Long	Lat



     id: 884,
    createdAt: '2023-07-24T10:32:38.777Z',
    updatedAt: '2023-07-24T10:32:38.777Z',
    publishedAt: null,
    latitude: 41.44799999999999,
    longitude: -7.187,
    code: null,
    qrcode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAK4SURBVO3BQa7jSAwFwUxC97/yGy+5KkCQ7OlPMMJ8sMYo1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxRijXKxUMqv5SETuWJJJyo/FISnijWKMUapVijXLwsCW9SOUnCHSqdSpeEkyS8SeVNxRqlWKMUa5SLL1O5Iwl3qJwk4SQJT6jckYRvKtYoxRqlWKNc/HFJ6FQ6lS4JkxVrlGKNUqxRLoZLwolKl4S/rFijFGuUYo1y8WVJ+CaVE5UuCV0SnkjCv6RYoxRrlGKNcvEylf9TEjqVE5UuCScq/7JijVKsUYo1ivlgEJUuCZ1Kl4RJijVKsUYp1igXD6l0SehUuiTcoXKShBOVE5UuCScqXRJOVLokdCpdEp4o1ijFGqVYo1x8WRI6lTuS8EQS3pSEE5UTlW8q1ijFGqVYo1w8lIRO5YkkdConSfgmlS4JJ0noVLokdCpvKtYoxRqlWKOYDx5QuSMJnUqXhDepdEnoVLok3KHSJeFE5SQJTxRrlGKNUqxRzAc/pHKShE6lS0Kn0iXhTSpdEk5U7kjCm4o1SrFGKdYo5oM/TOWJJHQqdyShU3kiCU8Ua5RijVKsUS4eUvmlJLxJ5SQJnUqncpKEE5U3FWuUYo1SrFEuXpaEN6mcJKFT6ZLQqXRJ6FQ6lZMkdCqdSpeEbyrWKMUapVijXHyZyh1JeJPKicoTKneofFOxRinWKMUa5WKYJHQqXRImK9YoxRqlWKNc/HEqXRLepNIl4Q6VO5LwRLFGKdYoxRrl4suS8E1J6FTuUOmS0CXhRKVLQpeEXyrWKMUapVijXLxM5ZdUuiR0KidJOFHpktAl4USlS0Kn0iXhiWKNUqxRijWK+WCNUaxRijVKsUYp1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlP8AJr0L/Ek714wAAAAASUVORK5CYII=',
    distrito: null,
    eletronica: null,
    abertura: null,
    data: '2023-07-24',
    concelho: 'Mirandela',
    acao: 'reforco'




version: '3.9'

services:
  postgres:

    image: postgres:14-alpine
    restart: always
    ports:
      - 5432:5432
    volumes:
      - ~/apps/postgres:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=CIM-ttm@2023
      - POSTGRES_USER=geovespa
      - POSTGRES_DB=vespa
>>>>>>> 52441519896e371007352e43f2389344fed812ac

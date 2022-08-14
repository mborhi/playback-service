# Playback Service

This the playback microservice for <-- Spotify Quick Discover Link -->. It used to deliver and handle playback features.

---

## Table of Contents
* [Quick Start](#quick-start)
    + [Docker](#docker)
    + [Local](#local)
* [Service Architecture](#service-architecture)
    + [Endpoints](#endpoints)

---

# Quick Start

This section explains how to get necessary files and deploy this app locally.

## Docker

The quickest way to run this app locally on your machine is to pull the `mborhi/spotify-quick-discover/playback-service` from Dockerhub. 

To do this, first make sure you have docker command tools installed your machine. Verify this by entering the following command in your terminal:

```
docker --version
```

If you get an error, you can install it on the official [Docker page](https://www.docker.com/get-started/).

Pull the image by entering the following command:

```
docker pull mborhi/spotify-quick-discover/playback-service 
```

You now have the Docker image installed. If you have the Docker desktop app installed you can simply head over to the Images section and click run beside the image you just pulled. Otherwise, you can run the image using the `run` command:

```
docker run --rm -dp 3000:3000 mborhi/spotify-quick-discover/playback-service
```

Verify that the image is successfully running by visiting http://localhost:3000 in your preferred browser.

To stop the container, use the command: 

```
docker stop mborhi/spotify-quick-discover/playback-service
```

## Local

Alternatively, you can clone this repository from GitHub and use the following commands to run the application on your local machine:

First install the necessary dependencies by running: `npm install`. Then, make sure to configure a `.env` file in the root of the directory, if you want to run the server on port different than 3000.

You are now ready to transpile and build the TypeScript files:

```
npm run tsc
```

Launch the server by using:

```
npm run start:prod
```

Verify that the server is live by visiting http://localhost:3000 in your preferred browser.

Simply press control-C in the terminal window running the server to stop the application.

---

## Service Architecture

This section outlines the architecture of this microservice, as well as its capabilities.

## Endpoints

Three endpoints are exposed: '/playback/play', '/playback/pause', and '/playback/volume'. You can find documentation for these endpoints on Postman.
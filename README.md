# Playback Service

This the playback microservice for [Spotify Quick Discover Link](https://github.com/mborhi/Distributed-Spotify-Quick-Discover). It used to deliver and handle playback features.

## Table of Contents
* [Quick Start](#quick-start)
    + [Docker](#docker)
    + [GitHub](#github)
* [Service Architecture](#service-architecture)
    + [Endpoints](#endpoints)
    + [Utilities](#utilities)
* [Testing](#testing)

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

## GitHub

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

# Service Architecture

This section outlines the architecture of this microservice, as well as its capabilities.

## Endpoints

Three endpoints are exposed: '/playback/play', '/playback/pause', and '/playback/volume'. You can find documentation for these endpoints on the Postman [Spotify Quick Discover Microservices](https://www.postman.com/research-operator-51189562/workspace/spotify-quick-discover-microservices/overview) workspace page.

* __/playback/play__
    + For starting a new song, or resuming the current one.
    + Uses two [utility functions](#play-endpoint-utilities)
* __/playback/pause__
    + For pausing the current song
    + Uses one [utility function](#pause-endpoint-utilities)
* __/playback/volume__
    + For setting the volume of the currently playing song.
    + Uses two [utility functions](#volume-endpdoint-utilities)

## Utilities

To fulfill the services of each endpoint, a couple utilties functions are used.

### Play Endpoint Utilities

Two functions are used: one to request the Playback State of the currently playing song from the Spotify Web API, and one to make a request to play the supplied track.

### Pause Endpoint Utilities

A function which makes a request to the Spotify Web API to pause the currently playing song on the supplied Web Player device. 

### Volume Endpoint Utilities

Two functions are used: one to validate that the supplied volume is valid, and one to make a request to the Spotify Web API to change the volume of the currently playing song. 

---

# Testing

Tests for the utility functions are written using the Jest testing framework. The endpoints are tested using [Postman](https://www.postman.com/research-operator-51189562/workspace/spotify-quick-discover-microservices/overview).

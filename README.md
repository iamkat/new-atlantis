new-atlantis
============

# Pre-requisites

(see http://nodered.org/docs/hardware/raspberrypi.html)
 * node-red 
 * wiring pi

# Installation

Install dependency
 * npm install moment

Copy node-red files
 * git clone https://github.com/iamkat/new-atlantis.git
 * cp new-atlantis/settings.js node-red-0.9.1/
 * cp new-atlantis/flows_raspberrypi.json node-red-0.9.1/

# Run

 * cd ~/node-red-0.9.1
 * node red.js

# Configure for auto-start

 * http://nodered.org/docs/hardware/raspberrypi.html#making-node-red-autostart-on-boot-optional

# Wiring
Ground to pin #6 (GND), live wire to pin #12, (GPIO 1 / BCM GPIO 18 / WiringPi 1)

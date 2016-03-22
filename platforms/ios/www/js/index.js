/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var cordovaApp = {

    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },

    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function () {
        cordovaApp.receivedEvent('deviceready', true);
    },

    receivedEvent: function (id, $esCordova) {


        if ($esCordova) {

            if (device.platform == "Android") {

                navigator.RADIO.initialize(function (s) {
                    if (s == 'STOPPED-FROM-NOTIFICATION') {
                        app.secciones._SeccionHome.stopAudioFromNotification()
                    }

                }, function (s) {
                    alert('ERROR RADIO.initialize');
                });


            }


        }


        app.initialize($esCordova);

    }

};

cordovaApp.initialize();
var app = new App()
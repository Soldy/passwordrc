#!/usr/bin/node
'use strict'


const nanoTest  = new (require('nanoTest')).test({
    'debugPrint' : 'short'
});
const passwordCheck = new (require('./index.js')).base();
         nanoTest.add(
             'not string password',
             {
                 "function":passwordCheck.check,
                 "options":[
                    123456 
                ]
              },
              "==",
              false
         );
         nanoTest.add(
             'setup with wrong type',
             {
                 "function":passwordCheck.set,
                 "options":[
                     'checkWrong',
                     'size',
                     false
                ]
              },
              "==",
              false
         );
         nanoTest.add(
             'setup with wrong name',
             {
                 "function":passwordCheck.set,
                 "options":[
                     'check',
                     'wrong',
                     false
                 ]
              },
              "==",
              false
        );
        nanoTest.add(
             'setup check upperCase',
              {
                 "function":passwordCheck.set,
                 "options":[
                     'check',
                     'upperCase',
                     true
                 ]
              },
              "==",
              true
        );
        nanoTest.add(
             'setup check lowerCase',
              {
                 "function":passwordCheck.set,
                 "options":[
                     'check',
                     'lowerCase',
                     true
                 ]
              },
              "==",
              true
        );
        nanoTest.add(
             'setup check number',
              {
                 "function":passwordCheck.set,
                 "options":[
                     'check',
                     'number',
                     true
                ]
              },
              "==",
              true
        );
        nanoTest.add(
             'setup check special',
              {
                 "function":passwordCheck.set,
                 "options":[
                     'check',
                     'special',
                     true
                ]
              },
              "==",
              true
        );
        nanoTest.add(
             'setup check size',
              {
                 "function":passwordCheck.set,
                 "options":[
                     'check',
                     'size',
                     true
                 ]
              },
              "==",
              true
        );
        nanoTest.add(
             'setup min upperCase',
              {
                 "function":passwordCheck.set,
                 "options":[
                     'min',
                     'upperCase',
                     2
                 ]
              },
              "==",
              true
        );
        nanoTest.add(
             'setup min lowerCase',
              {
                 "function":passwordCheck.set,
                 "options":[
                     'min',
                     'lowerCase',
                     2
                 ]
              },
              "==",
              true
        );
        nanoTest.add(
             'setup min number',
              {
                 "function":passwordCheck.set,
                 "options":[
                     'min',
                     'number',
                     2
                 ]
              },
              "==",
              true
        );
        nanoTest.add(
             'setup min special',
              {
                 "function":passwordCheck.set,
                 "options":[
                     'min',
                     'special',
                     1
                 ]
              },
              "==",
              true
        );
        nanoTest.add(
             'setup min size',
              {
                 "function":passwordCheck.set,
                 "options":[
                     'min',
                     'size',
                     12
                 ]
              },
              "==",
              true
        );
        nanoTest.add(
             'setup max upperCase',
              {
                 "function":passwordCheck.set,
                 "options":[
                     'max',
                     'upperCase',
                    10
                 ]
              },
              "==",
              true
        );
        nanoTest.add(
             'setup max lowerCase',
              {
                 "function":passwordCheck.set,
                 "options":[
                     'max',
                     'lowerCase',
                     10
                 ]
              },
              "==",
              true
        );
        nanoTest.add(
             'setup max number',
              {
                 "function":passwordCheck.set,
                 "options":[
                     'max',
                     'number',
                     10
                 ]
              },
              "==",
              true
        );
        nanoTest.add(
             'setup max special',
              {
                 "function":passwordCheck.set,
                 "options":[
                     'max',
                     'special',
                     10
                 ]
              },
              "==",
              true
        );
        nanoTest.add(
             'setup max size',
              {
                 "function":passwordCheck.set,
                 "options":[
                     'max',
                     'size',
                     40
                 ]
              },
              "==",
              true
        );
        nanoTest.add(
             'check correct password',
              {
                 "function":passwordCheck.check,
                 "options":[
                    "C0rr3ct.P4ssw0rd."
                 ]
              },
              "===",
              true
        );
        nanoTest.add(
             'check correct password log',
              {
                 "function":passwordCheck.getLog,
                 "options":[
                 ]
              },
              "j==",
              {
                 checks:{ 
                     min:{ 
                         upperCase: true,
                         lowerCase: true,
                         number: true,
                         special: true,
                         size: true 
                     },
                     max:{
                         upperCase: true,
                         lowerCase: true,
                         number: true,
                         special: true,
                         size: true 
                    },
                    upperCase: true,
                    lowerCase: true,
                    number: true,
                    special: true,
                    size: true 
                },
                failed: [],
                ok: [],
                result: true,
                values:{
                    upperCase   :2,
                    lowerCase   :9,
                    number      :4,
                    special     :2,
                    size        :17,
                    duplication :5
                }
            }

        );
        nanoTest.add(
             'check no upper case',
              {
                 "function":passwordCheck.check,
                 "options":[
                    "wr0ng.p4ssw0rd.",
                 ]
              },
              "==",
              false
        );
        nanoTest.add(
             'check no lower case',
              {
                 "function":passwordCheck.check,
                 "options":[
                    "WR0NG.P4SSW0RD.",
                 ]
              },
              "===",
             false 
        );
        nanoTest.add(
             'check no numbers',
              {
                 "function":passwordCheck.check,
                 "options":[
                    "wrong.password.",
                 ]
              },
              "==",
              false
        );
        nanoTest.add(
             'check no special',
              {
                 "function":passwordCheck.check,
                 "options":[
                    "WR0ngp4ssword",
                 ]
              },
              "==",
              false
        );
        nanoTest.add(
             'check short password',
              {
                 "function":passwordCheck.check,
                 "options":[
                    "S0hr1T",
                 ]
              },
              "==",
              false
        );
       nanoTest.run();

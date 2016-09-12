/**
 * Created by Peter on 12/09/2016.
 */
'use strict';

function calculatePrime(min, max, threads){

    var startTime = new Date().getTime();

    var numLogicalCores;
    if(threads == undefined) {
        numLogicalCores = navigator.hardwareConcurrency;
    } else {
        numLogicalCores = threads;
    }


    if(numLogicalCores > 0 ) {

        var rangeSize = max - min;
        var chunkSize = rangeSize/numLogicalCores;
        var responses = 0;
        var numOfPrimes = 0;

        var workerArray = [];

        for (var i = 0; i < numLogicalCores; i++) {
            workerArray[i] = new Worker("primeWorker.js");
            workerArray[i].postMessage([i*chunkSize,((i+1)*chunkSize)]);
            workerArray[i].onmessage = function(e){
                numOfPrimes += e.data;
                responses++;
                if(responses == workerArray.length){
                    var time = new Date().getTime() - startTime;
                    console.log('Number of Primes: ' + numOfPrimes + '\nTime in milliseconds: ' + time);
                }
            }
        }
    }
}
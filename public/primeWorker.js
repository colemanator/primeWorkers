/**
 * Created by Peter on 12/09/2016.
 */


onmessage = function(e){
    postMessage(countPrimes(e.data[0],e.data[1]));
};

function countPrimes(min, max){

    var square = Math.ceil(Math.sqrt(max));
    var numOfPrimes = 0;
    var prime;

    for (var i = min; i < max; i++) {
        prime = true;
        for (var n = 2; n <= square; n++) {
            if (i % n == 0 && i != n) {
                prime = false;
                break;
            }
        }
        if(prime){
            numOfPrimes++;
        }
    }

    return numOfPrimes;
}
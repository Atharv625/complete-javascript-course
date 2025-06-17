'use strict';


function calcAge(birthyear)
{
    const age =2025-birthyear;
    function printAge()
    {
        const output=`you are ${age}, born in ${birthyear}`;
        console.log(output);
    }
    printAge();
    return age;
}
console.log(calcAge(2005 ));


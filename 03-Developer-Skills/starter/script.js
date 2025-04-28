// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// const calcTemp=function(t1,t2)
// {  const temps=t1.concat(t2);
//     let max=temps[0];
//     let min=temps[0];
//     for(let i=0;i<temps.length;i++)
//     {
//         if(max<temps[i])
//             max=temps[i];
//         if(min>temps[i])
//             min=temps[i];
//     }

//     console.log(max, min);
//     return max-min;
// };
// calcTemp([5,6,8,59],[89,36,45,25,1]);


  const data1=[17,21,23]
  const data2=[12,5,-5,0,4]
  var temp="°C";
  console.log(`...${data1[0]}${temp}...${data1[1]}${temp}...${data1[2]}${temp}`)


  const printForecast=function (arr)
  {
    let str='';
    for(let i=0;i<arr.length;i++)
    {
        str=str+` ${arr[i]}${temp}`

    }
    console.log(str);
  };
  printForecast(data1);
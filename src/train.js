function mergeSortedArrays(array1, array2) {
  const mergedArray = array1.concat(array2);

  return mergedArray.sort((a, b) => a - b);
}

const result = mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]);
console.log(result); 

// function getSquareNumbers(numbers) {
//   const result = [];

//   for (let i = 0; i < numbers.length; i++) {
//     const number = numbers[i];
//     result.push({
//       number: number,
//       square: number * number
//     });
//   }

//   return result;
// }

// console.log(getSquareNumbers([1, 2, 3]));

// function countVowels(str) {
//    return [...str].filter(char => 'aeiou'.includes(char.toLowerCase())).length;
// }

// console.log(countVowels("string"));
// console.log(countVowels("apple"));
// console.log(countVowels("sun"));

/**
 * Frontend validatin
 * backend validation
 * Database validation
 */

//    const element_soni = {};

//    for (let element of massiv) {
//        element_soni[element] = (element_soni[element] || 0) + 1;
//    }

//    let eng_ko_p_soni = 0;
//    let asosiy_element = null;

//    for (let element in element_soni) {
//        if (element_soni[element] > eng_ko_p_soni) {
//            eng_ko_p_soni = element_soni[element];
//            asosiy_element = element;
//        }
//    }

//    return Number(asosiy_element);
// }

// console.log(asosiy_element([1, 2, 3, 4, 5, 4, 3, 4]));

/* Project Standarts
- Logging standarts
- Naming standarts
   function, method, variable => CAMEL    goHome
   class => PASCAL                         MemberService      
   folder => KEBAB
   css => SNAKE                            button_style

- Error Handling 


// Request
Traditional API (form POST)
REST API
GrafphQL API
...
*/

/* 

Traditional FD => BSSR (Adminka) => EJS 
Modern FD      => SPA (USer application) => REACT
framework orqalik amalga oshiramiz
JSON frontend backendan faqat json formatdagi datani qabul qiladi browserda joylashgan spa miz frontedni ozi quradi

*/
// Cookie
// Request join
// self destroy

// function getDigits(a) {
//   return [...a].filter(belgi => belgi >= "0" && belgi <= "9").join("");
// }

// console.log(getDigits("m14i1t"));

// function getPositive(sonlar) {
//   const musbatSonlar = sonlar.filter(num => num > 0);
//   return musbatSonlar.join('');
// }

// console.log(getPositive([1, -4, 2]));

// function engKattaQiymatIndeksi(a) {
//     const engKattaQiymat = Math.max(...a);
//     return a.findIndex(son => son === engKattaQiymat);
//   }

//   console.log(engKattaQiymatIndeksi([5, 21, 12, 21, 8]));

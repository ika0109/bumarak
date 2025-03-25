function asosiy_element(massiv) {
 
   const element_soni = {};
   
   for (let element of massiv) {
       element_soni[element] = (element_soni[element] || 0) + 1;
   }

   let eng_ko_p_soni = 0;
   let asosiy_element = null;
   
   for (let element in element_soni) {
       if (element_soni[element] > eng_ko_p_soni) {
           eng_ko_p_soni = element_soni[element];
           asosiy_element = element;
       }
   }
   
   return Number(asosiy_element);
}


console.log(asosiy_element([1, 2, 3, 4, 5, 4, 3, 4]));  








/* Project Standarts
- Logging standarts
- Naming standarts
   function, method, variable => CAMEL    goHome
   class => PASCAL                         MemberService      
   folder => KEBAB
   css => SNAKE                            button_style

- Error Handling 

Traditional API
REST API
GrafphQL API
...
*/







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
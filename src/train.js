function getPositive(sonlar) {
  const musbatSonlar = sonlar.filter(num => num > 0);
  return musbatSonlar.join('');
}


console.log(getPositive([1, -4, 2])); 
  






// function engKattaQiymatIndeksi(a) {
//     const engKattaQiymat = Math.max(...a);
//     return a.findIndex(son => son === engKattaQiymat);
//   }
  
  
//   console.log(engKattaQiymatIndeksi([5, 21, 12, 21, 8])); 
function engKattaQiymatIndeksi(a) {
    const engKattaQiymat = Math.max(...a);
    return a.findIndex(son => son === engKattaQiymat);
  }
  
  
  console.log(engKattaQiymatIndeksi([5, 21, 12, 21, 8])); 
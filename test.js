let o = [
  {name: 'carrot'},
  {name: 'apple'},
  {name: 'banana'},
  {name: 'apple'}
];

o = o.sort((a,b) => {
  if (a.name < b.name) return -1;
  else return 1;
});

console.log(o);
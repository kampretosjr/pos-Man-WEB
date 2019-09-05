var SarungStore =[
  {
      Name:"Sarung Wadimor",
      Damage:99.99,
      Durability:"poor"
  },
  {
      "Name":" Sarung gajah berdiri",
      Damage:55.55,
      Durability:"standrart"
  },
  {
      Name:"Sarung mangga",
      Damage:75.33,
      Durability:"good"
  },
  ];
  
  /////////////////////////////////////////////////////////////////////////////////////////
  
  //show specific array by  index
  console.log(SarungStore[0])
  
  //Delete item from Array of object
  // delete SarungStore[0].Damage;
  
  //Delete object from Array
  // delete SarungStore[1];
  
  //push new thing to array 2
  SarungStore.push(
      {
          Name:"Sarung Attlas",
          Damage:22.12,
          Durability:"very strong"
      }
  )
  //Change value on Item property or fill the empty object
  SarungStore[0].length = 44.11;
  
  //Show all item on Array 1
  console.log(SarungStore[0])
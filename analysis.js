const fs = require('fs');

/*
  INPUT
    text <String> the line conversation record read from the txt file
                  the text content should start with xxxx/xx/xx（x）...
  OUTPUT
    The joined and left names
  RETURN
    <Array> A array of [name, count] where the elements are sorted 
            from large to small by the counts of them
*/
const textToCountArr = (text) => {
  let re = new RegExp('..[0-9][0-9]:[0-9][0-9]\t');
  let dateMark = new RegExp('[0-9][0-9][0-9][0-9].[0-9][0-9].[0-9][0-9]');
  let arr = text.split(re);
  arr = arr.map(line => {
    return line.split('\t')[0];
  })
  
  let obj = {};
  let joined = [];
  let left = [];
  arr.forEach(name => {
    if(name.includes('已收回訊息')) {
      name = name.split('已收回訊息')[0];
      if(!obj[name]) obj[name] = 1;
      else obj[name]++;
    } else if(name.includes('退出群組')) {
      if(name.includes('已讓')){
        left.push(name.split('已讓')[1].split('退出群組')[0]);
      } else {
        left.push(name.split('已退出群組')[0]);
      }
    } else if(name.includes('加入群組')) {
      if(name.includes('邀請')){

      } else {
        joined.push(name.split('加入群組')[0]);
      }
    } else if(name.includes('已將')) {

    } else if(name.includes('已取消')) {

    } else if(name.includes('更改了')) {

    } else if(name.includes('已結束')) {

    } else if(!dateMark.test(name)) {
      if(!obj[name]) obj[name] = 1;
      else obj[name]++;
    }
  });

  let sortable = [];

  for(var name in obj)
    sortable.push([name, obj[name]]);
  
  sortable.sort((a,b) => {
    return b[1] - a[1];
  })

  console.log('\n加入群組')
  console.log(joined);
  console.log('\n退出或被移出群組');
  console.log(left);

  return sortable;
}

const main = () => {
  const fileName = process.argv[2];
  if(!fileName) {
    console.log(`Usage: ${process.argv[0]} ${process.argv[1]} filename`);
    return 0;
  }

  let fileContent = fs.readFileSync(fileName).toString();
  let arr = textToCountArr(fileContent);

  console.log('\n發話次數')
  for(var i=0; i<arr.length; i++)
    console.log(`${arr[i][0]}:\t${arr[i][1]}`)
}

main();
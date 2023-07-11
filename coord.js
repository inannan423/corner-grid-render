const fs = require('fs');

// 读取原始文件
const rawData = fs.readFileSync('./public/SHB5_4W_COORD.GRDECL', 'utf8');


// 逐个读取数据，读取六个点，x,y,z1,x,y,z2 为一组，生成 [x,y,z1,z2] 四个值的数组, 保存到 result 中
// 2409.36434 3620.519578 6394.022461 2409.36434 3620.519578 7829.035156 2386.9824 3628.23662 6394.05127 2386.9824 3628.23662
//   7829.086914 2364.600459

// 读取原始文件
const result = [];
// 将换行替换为空格
const data = rawData.replace(/\n/g, ' ');
// 将多个空格替换为一个空格
const data2 = data.replace(/\s+/g, ' ');
// 将字符串按空格分割为数组并删除空数据
const data3 = data2.split(' ').filter(item => item !== '');
console.log(data3);
// 逐个读取数据，读取六个点，x,y,z1,x,y,z2 为一组，生成 [x,y,z1,z2] 四个值的数组, 保存到 result 中
for (let i = 0; i < data3.length; i += 6) {
    const x = parseFloat(data3[i]);
    const y = parseFloat(data3[i + 1]);
    const z1 = parseFloat(data3[i + 2]);
    const z2 = parseFloat(data3[i + 5]);
    // 将数据保存到 result 中
    result.push([x, y, z1, z2]);
}

// 将 result 保存到 result.json 文件中
fs.writeFileSync('result.json', JSON.stringify({ data: result }));


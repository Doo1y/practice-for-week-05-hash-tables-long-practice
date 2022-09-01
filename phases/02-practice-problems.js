function anagrams(str1, str2) {
  let strSet = new Set(str1.split(''));

  for (let i = 0; i < str2.length; i++) {
    if (!strSet.has(str2[i])) return false;
  }

  return true;
}


function commonElements(arr1, arr2) {
  let newArr = []
  let set = new Set(arr1);
  for (let i = 0; i < arr2.length; i++) {
    if (set.has(arr2[i])) newArr.push(arr2[i])
  }
  return newArr;
}


function duplicate(arr) {
  let set = new Set(arr);
  for (let i = 0; i < arr.length; i++) {
    if (set.has(arr[i])) set.delete(arr[i]);
    else return arr[i];
  }
}


function twoSum(nums, target) {
  let set = new Set(nums);
  let check = false
  for (let n = nums.length - 1; n >= 0; n--) {
    set.forEach(j => {
      if (nums[n] !== j && nums[n] + j === target) check = true;
    });
    if (check === true) return check;
    set.delete(nums[n]);
  }
  return check;
}



function wordPattern(pattern, strings) {
  let strSet = new Set(strings);
  let charSet = new Set(pattern.split(''));
  let i = 0
  while (i < pattern.length){
    if (charSet.size !== strSet.size) {
      return false;
    } else {
      charSet.delete(pattern[i]);
      strSet.delete(strings[i]);
      i++;
    }
  }
  return true;
}


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
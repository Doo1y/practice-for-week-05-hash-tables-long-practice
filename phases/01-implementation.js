class KeyValuePair {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.capacity = numBuckets;
    this.data = Array.from({ length: numBuckets }, (v, i) => null);
    this.count = 0;
    this.load = this.count / this.capacity;
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    let index = this.hashMod(key);
    let hashLink = this.data[index];
    // if the key already exists in the hash table, update the value
    while (hashLink) {
      if (hashLink.key === key && hashLink.value !== value) return hashLink.value = value;
      hashLink = hashLink.next;
    }
    // if key does not exist, add it to the linked list
    let keyValuePair = new KeyValuePair(key, value);
    keyValuePair.next = this.data[index];
    this.data[index] = keyValuePair;
    this.count++;
  }


  read(key) {
    let keyIndex = this.hashMod(key);

    let keyValuePointers = this.data[keyIndex];

    while (keyValuePointers) {
      if (keyValuePointers.key === key) {
        return keyValuePointers.value;
      }

      keyValuePointers = keyValuePointers.next;
    }

    return undefined;
  }


  resize() {
    let preserved = this.data;

    this.capacity *= 2;

    this.data = Array.from({ length: this.capacity }, (v, i) => null);
    this.count = 0;

    preserved.forEach(pair => {
      let current = pair;
      while (current) {
        this.insert(current.key, current.value);
        current = current.next;
      }
    });
  }



  delete(key) {
    let index = this.hashMod(key);
    let prevData = this.data[index];
    
    if (!this.read(key)) {
      return "Key not found"
    }

    if (prevData.key === key) {
      let deleteData = this.data[index];
      this.data[index] = this.data[index].next;
      this.count--;
      return deleteData;
    } else if (prevData.next) {
      let Data = prevData.next
      while (Data) {
        if (Data.key === key) {
          let deleteData = Data;
          this.data[index].next = Data.next;
          this.count--;
          return deleteData;
        }
        Data = Data.next;
      }
    } 
  }
}

module.exports = HashTable;
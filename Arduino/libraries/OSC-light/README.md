Based upon [the OSC library from Yotam Mann](https://github.com/CNMAT/OSC):

```
 Written by Yotam Mann, The Center for New Music and Audio Technologies,
 University of California, Berkeley.  Copyright (c) 2012, The Regents of
 the University of California (Regents).
```

# OSC for Arduino light

This library is not fully tested yet, and probably not finished. But it is fast.

## Serialized message layout
An OSC message consists of 3 parts: an address, an array of data types and the
array of data. Each part is 4n bytes long and is padded with null characters.
A message with address `/ThisIsA/Message` containing two integers and a float looks
like this serialized:

````
Address                                            Data types           Data contents
/  T  h  i  s  I  s  A  M  e  s  s  a  g  e  \0 ,  i  i  f  \0 \0 \0 \0 31:32:39:39:34:38:38:32:30:31:39:32
2f:54:68:69:73:49:73:41:4d:65:73:73:61:67:65:00:2c:69:69:66:00:00:00:00:31:32:39:39:34:38:38:32:30:31:39:32
1  2  3  4  1  2  3  4  1  2  3  4  1  2  3  4  1  2  3  4  1  2  3  4  1  2  3  4  1  2  3  4  1  2  3  4
````

To avoid unnecessary padding, keep the address (including slashes) short, preferably 3 + 4n (n >= 0).

## `OSCMessage`
This is the main class which handles the processing of incoming message data, pattern matching
of addresses and serialization of message data.

### Constructor
Constructs a new message without any data and without an address.

### `void setAddress(const char * address)`
Sets the address of the message to the given string. This will overwrite the previous
address.

### `void reserve(int count)`
Adds the given count of OSCData objects in the data array. This method should be
called before data is `add()`-ed as it will prevent repetitive expansions of the data
array.

### `void reserveAtLeast(int count)`
Checks if the item count existing array of OSCData objects is equal or larger than the
given count. If not, it reserves the missing items using `reserve()`.

### `void empty()`
Clears all OSCData objects in the data array. This method does not delete them, it
only empties them.

### `float getFloat(int position)`
Gets the float of the OSCData object at the given position.

### `int getInt(int position)`
Gets the integer of the OSCData object at the given position.

### `void add<typename T>(T datum)`
Adds the given datum with the given data type to the OSCData to the data array.
If the data array is not big enough, it calls `reserve(1)` to expand the data array.

### `bool isValidRoute(const char * pattern)`
Checks if the given pattern is a valid pattern for its address. It uses `OSCMatch`
to determine this.

### `void send(Print * print)`
Prints the message using the given Print object. See Serialized message layout for
the exact layout of the message.

### `void reserveForProcess(int dataLength)`
Expands the `processBuffer` if the given data length is bigger than the process buffers
length.

### `char * processBuffer`
The process buffer in which the incoming serialized message should be written.

### `void process()`
Reads and processes the information in the `processBuffer`. If the serialized message
is valid, all the information is interpreted and saved.


## `OSCMatch`

## `OSCData`

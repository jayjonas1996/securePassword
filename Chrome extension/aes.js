//require("utf8.js")

//var f = new AES("6Le0DgMTAAAAANokdEEial6Le0DgMTAAAAANokdEEia",{})

var  AES = function(key,options) {
 
    
    
        if(options.iv.length >0)
        {
            this.iv = _base64ToArrayBuffer(options.iv)  //convert to byte array of len 16 later
        	console.log("iv bytes",this.iv)
	}
        else
        { 
           // this.iv //create random 16 8bit integers and store in iv array
        }
       // this.key = []
        this.key = [0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0];
                    this.key = _base64ToArrayBuffer(key)
         /*[255,255,255,255,255,255,255,255,
                    255,255,255,255,255,255,255,255,
                    255,255,255,255,255,255,255,255,
                    255,255,255,255,255,255,255,255]*/
        //_base64ToArrayBuffer(key)
        ////
        this.previousBlock = []
        this.cipher =[]
        this.previousCipher = []
        this.decrypted = []
        this.temporary = []
        console.log("\nLength of key:  "+this.key.length)


       
        


        this.sBox = [ 0x63,0x7c,0x77,0x7b,0xf2,0x6b,0x6f,0xc5,0x30,0x01,0x67,0x2b,0xfe,0xd7,0xab,0x76,
            0xca,0x82,0xc9,0x7d,0xfa,0x59,0x47,0xf0,0xad,0xd4,0xa2,0xaf,0x9c,0xa4,0x72,0xc0,
            0xb7,0xfd,0x93,0x26,0x36,0x3f,0xf7,0xcc,0x34,0xa5,0xe5,0xf1,0x71,0xd8,0x31,0x15,
            0x04,0xc7,0x23,0xc3,0x18,0x96,0x05,0x9a,0x07,0x12,0x80,0xe2,0xeb,0x27,0xb2,0x75,
            0x09,0x83,0x2c,0x1a,0x1b,0x6e,0x5a,0xa0,0x52,0x3b,0xd6,0xb3,0x29,0xe3,0x2f,0x84,
            0x53,0xd1,0x00,0xed,0x20,0xfc,0xb1,0x5b,0x6a,0xcb,0xbe,0x39,0x4a,0x4c,0x58,0xcf,
            0xd0,0xef,0xaa,0xfb,0x43,0x4d,0x33,0x85,0x45,0xf9,0x02,0x7f,0x50,0x3c,0x9f,0xa8,
            0x51,0xa3,0x40,0x8f,0x92,0x9d,0x38,0xf5,0xbc,0xb6,0xda,0x21,0x10,0xff,0xf3,0xd2,
            0xcd,0x0c,0x13,0xec,0x5f,0x97,0x44,0x17,0xc4,0xa7,0x7e,0x3d,0x64,0x5d,0x19,0x73,
            0x60,0x81,0x4f,0xdc,0x22,0x2a,0x90,0x88,0x46,0xee,0xb8,0x14,0xde,0x5e,0x0b,0xdb,
            0xe0,0x32,0x3a,0x0a,0x49,0x06,0x24,0x5c,0xc2,0xd3,0xac,0x62,0x91,0x95,0xe4,0x79,
            0xe7,0xc8,0x37,0x6d,0x8d,0xd5,0x4e,0xa9,0x6c,0x56,0xf4,0xea,0x65,0x7a,0xae,0x08,
            0xba,0x78,0x25,0x2e,0x1c,0xa6,0xb4,0xc6,0xe8,0xdd,0x74,0x1f,0x4b,0xbd,0x8b,0x8a,
            0x70,0x3e,0xb5,0x66,0x48,0x03,0xf6,0x0e,0x61,0x35,0x57,0xb9,0x86,0xc1,0x1d,0x9e,
            0xe1,0xf8,0x98,0x11,0x69,0xd9,0x8e,0x94,0x9b,0x1e,0x87,0xe9,0xce,0x55,0x28,0xdf,
            0x8c,0xa1,0x89,0x0d,0xbf,0xe6,0x42,0x68,0x41,0x99,0x2d,0x0f,0xb0,0x54,0xbb,0x16 ];

            this.invsBox =  
            [
               0x52, 0x09, 0x6A, 0xD5, 0x30, 0x36, 0xA5, 0x38, 0xBF, 0x40, 0xA3, 0x9E, 0x81, 0xF3, 0xD7, 0xFB,
               0x7C, 0xE3, 0x39, 0x82, 0x9B, 0x2F, 0xFF, 0x87, 0x34, 0x8E, 0x43, 0x44, 0xC4, 0xDE, 0xE9, 0xCB,
               0x54, 0x7B, 0x94, 0x32, 0xA6, 0xC2, 0x23, 0x3D, 0xEE, 0x4C, 0x95, 0x0B, 0x42, 0xFA, 0xC3, 0x4E,
               0x08, 0x2E, 0xA1, 0x66, 0x28, 0xD9, 0x24, 0xB2, 0x76, 0x5B, 0xA2, 0x49, 0x6D, 0x8B, 0xD1, 0x25,
               0x72, 0xF8, 0xF6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xD4, 0xA4, 0x5C, 0xCC, 0x5D, 0x65, 0xB6, 0x92,
               0x6C, 0x70, 0x48, 0x50, 0xFD, 0xED, 0xB9, 0xDA, 0x5E, 0x15, 0x46, 0x57, 0xA7, 0x8D, 0x9D, 0x84,
               0x90, 0xD8, 0xAB, 0x00, 0x8C, 0xBC, 0xD3, 0x0A, 0xF7, 0xE4, 0x58, 0x05, 0xB8, 0xB3, 0x45, 0x06,
               0xD0, 0x2C, 0x1E, 0x8F, 0xCA, 0x3F, 0x0F, 0x02, 0xC1, 0xAF, 0xBD, 0x03, 0x01, 0x13, 0x8A, 0x6B,
               0x3A, 0x91, 0x11, 0x41, 0x4F, 0x67, 0xDC, 0xEA, 0x97, 0xF2, 0xCF, 0xCE, 0xF0, 0xB4, 0xE6, 0x73,
               0x96, 0xAC, 0x74, 0x22, 0xE7, 0xAD, 0x35, 0x85, 0xE2, 0xF9, 0x37, 0xE8, 0x1C, 0x75, 0xDF, 0x6E,
               0x47, 0xF1, 0x1A, 0x71, 0x1D, 0x29, 0xC5, 0x89, 0x6F, 0xB7, 0x62, 0x0E, 0xAA, 0x18, 0xBE, 0x1B,
               0xFC, 0x56, 0x3E, 0x4B, 0xC6, 0xD2, 0x79, 0x20, 0x9A, 0xDB, 0xC0, 0xFE, 0x78, 0xCD, 0x5A, 0xF4,
               0x1F, 0xDD, 0xA8, 0x33, 0x88, 0x07, 0xC7, 0x31, 0xB1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xEC, 0x5F,
               0x60, 0x51, 0x7F, 0xA9, 0x19, 0xB5, 0x4A, 0x0D, 0x2D, 0xE5, 0x7A, 0x9F, 0x93, 0xC9, 0x9C, 0xEF,
               0xA0, 0xE0, 0x3B, 0x4D, 0xAE, 0x2A, 0xF5, 0xB0, 0xC8, 0xEB, 0xBB, 0x3C, 0x83, 0x53, 0x99, 0x61,
               0x17, 0x2B, 0x04, 0x7E, 0xBA, 0x77, 0xD6, 0x26, 0xE1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0C, 0x7D
            ];

        
        }

        AES.prototype.setCipher = function(baseb4Cipher)
        {
            this.cipher = _base64ToArrayBuffer(baseb4Cipher)
           console.log("cipher set",this.cipher.length)
        }
        AES.prototype.getPlaintext = function()
        {
           
           return ArraytoUTF8(this.decrypted)
        }
/*
    generate_lookup_tables()
    {
        
    }

/*
    AES.prototype.expandKey = function()
    {
        var i=0,index=32
        var temp = []

        
        for(i=0;i<7;i++)
        {//setTimeout(this.expandKey, 5);
            //rot word
            temp.push(this.key[(i*32)+29])
            temp.push(this.key[(i*32)+30])
            temp.push(this.key[(i*32)+31])
            temp.push(this.key[(i*32)+28])


            //sbox substitution
            temp[0] = this.sBox[temp[0]]
            temp[1] = this.sBox[temp[1]]
            temp[2] = this.sBox[temp[2]]
            temp[3] = this.sBox[temp[3]]

            //gf 
            temp[0] ^= this.rCon[i] 
            
            //xor with key
            temp[0] ^= this.key[(i*32)  ]  
            temp[1] ^= this.key[(i*32)+1] 
            temp[2] ^= this.key[(i*32)+2] 
            temp[3] ^= this.key[(i*32)+3] 

            this.key.push(temp[0], temp[1], temp[2], temp[3]) //push into key
            index += 4

            //create next 12 bytes and push
            for(j=0;j<3;j++)
            {
                temp[0] ^= this.key[ (i*32) + (j*4) + 4      ]   
                temp[1] ^= this.key[ (i*32) + (j*4) + 4 + 1  ] 
                temp[2] ^= this.key[ (i*32) + (j*4) + 4 + 2  ]  
                temp[3] ^= this.key[ (i*32) + (j*4) + 4 + 3  ]  

                this.key.push(temp[0], temp[1], temp[2], temp[3])
                index += 4
            }
            if(i==6)
            {return}

            //sbox last bytes
            temp[0] = this.sBox[temp[0]]
            temp[1] = this.sBox[temp[1]]
            temp[2] = this.sBox[temp[2]]
            temp[3] = this.sBox[temp[3]]
            
            //xor with key
            temp[0] ^= this.key[((i + 1) * 32) - 16 ]
            temp[1] ^= this.key[((i + 1) * 32) - 16 + 1]
            temp[2] ^= this.key[((i + 1) * 32) - 16 + 2]
            temp[3] ^= this.key[((i + 1) * 32) - 16 + 3]

            this.key.push(temp[0], temp[1], temp[2], temp[3]) //push into key
            index += 4

            //create next 12 bytes
            for(j=0;j<3;j++)
            {
                temp[0] ^= this.key[ (i*32) - 12      ]  
                temp[1] ^= this.key[ (i*32) - 12 + 1  ]    
                temp[2] ^= this.key[ (i*32) - 12 + 2  ]    
                temp[3] ^= this.key[ (i*32) - 12 + 3  ]    

                this.key.push(temp[0], temp[1], temp[2], temp[3])
                index += 4
            }

            temp = [] //reset array
            
        }
    }*/

/*
    AES.prototype.rotate = function(byts)
    {

        var temp = byts[0]
        var c = 0 ;
        for(c=0;c<3;c++) {
                byts[c] = byts[c+1];
        }
        byts[3] = temp
        return byts

    }*/

    AES.prototype.encrypt = function(data)
    {
        var i,j,currblock=[];
        var pt = UTF8toArray(data)
        const lastBytes = pt.length % 16
        var plainText = []
        console.log(pt.length)
        console.log("plaintext",pt)
        if(lastBytes != 0)
        {
             const padding = 16 - lastBytes
             for(i=0;i<padding;i++)
             {
                 pt.push(0x00)                                                             //Add padding to complete the data in multiple of 16 bytes
             }
             plainText = pt
             pt = []
        }
        else
        {   plainText = pt  }
        
        //console.log(plainText.length)    //32
        if(plainText.length % 16 == 0)
        {
            var blocks = plainText.length / 16;
            this.initialisefromIV()                                                         //Add initialisation vector to the first block (CBC mode)
            for(i=0;i<blocks;i++)                                                           //for each block of plainetext as CBC
                {
                    currblock = this.get16BytesBlock(plainText,i)                           //read new 16 bytes of plain text
                    currblock = this.CBCXOR(currblock)                                    //XOR plaintext block with previous cipher block or initialisation vector for first block
            
                    currblock = this.addRoundKey(currblock,0)                               //initial round add round key (first 128 bits of key)

                    for(j=0;j<13;j++)                                                       // 13 Rounds of encryption 
                    {
                        currblock = this.subBytes(currblock)
                        currblock = this.shiftRows(currblock)
                        currblock = this.TEMPMixColumns(currblock)//this.mixColumns(currblock)
                        currblock = this.addRoundKey(currblock,(j+1)*16)
                    }  
                                                                                            //Final(14th) round without mix columns
                    currblock = this.subBytes(currblock)
                    currblock = this.shiftRows(currblock)
                    currblock = this.addRoundKey(currblock,224)

                    this.end(currblock)                                                     //append cipher and store it to add to next block of plain text
                }
                console.log("encrypted",this.cipher)

            
           
        }
        else
        {
            console.log("Plain Text not in multiple of 16")
        }
        
    }


    AES.prototype.initialisefromIV = function(){    
        var i;
        this.previousBlock = []
        this.previousCipher = []
        for(i=0;i<16;i++)
        {   
            this.previousBlock.push(this.iv[i])
            this.previousCipher.push(this.iv[i])
        }
        return 
    }


    AES.prototype.get16BytesBlock = function(pt,i){
        var temp = [],j
        for(j=i*16;j<16*(i+1);j++)
        {
            temp.push(pt[j]);
        }
        return temp;
    }

    AES.prototype.CBCXOR = function(currBlock){
        var j,temp=[];
        for(j=0;j<16;j++)
        {
            temp.push(  this.previousBlock[j] ^ currBlock[j] );
        }
        return temp;
    }

    
    

    AES.prototype.subBytes = function(block)
    {
        var i;
        for(i=0;i<16;i++)
        {
            block[i] = this.sBox[block[i]]
        }
        return block;
    }

    AES.prototype.shiftRows = function(state){
        var temp = []

        temp[0] = state[0]
        temp[1] = state[5]
        temp[2] = state[10]
        temp[3] = state[15]

        temp[4] = state[4]
        temp[5] = state[9]
        temp[6] = state[14]
        temp[7] = state[3]
        
        temp[8] = state[8]
        temp[9] = state[13]
        temp[10] = state[2]
        temp[11] = state[7]

        temp[12] = state[12]
        temp[13] = state[1]
        temp[14] = state[6]
        temp[15] = state[11]
        
        return temp;
        
        
    }

    AES.prototype.addRoundKey = function(state,first){
        var i ;
        for(i=0;i<16;i++)
        {
            state[i] ^= this.key[i + first]
        }
        return state
    }

    AES.prototype.end = function(state){
        this.previousBlock = []
        var i ;
        for(i=0;i<16;i++)
        {
            this.previousBlock.push(state[i])
            this.cipher.push(state[i])
        }
        
    }






    AES.prototype.decrypt = function() //take byte array or base64 encoded ciphertext
    {
        var i,j;
        var blocks = this.cipher.length / 16
        var currBlock = [],temporary = []
        this.initialisefromIV()
        for(i=0;i<blocks;i++){

            currBlock = this.get16BytesBlock(this.cipher,i)  
            console.log("taking value",currBlock)                                              //get next block
            this.temporaryStorage("set",currBlock)          //temporary = currBlock                                                           //save the block for later addition in CBC
            currBlock = this.addRoundKey(currBlock,224)                                       //add round key

            for(j=0;j<13;j++){                                                                             // 13 rounds of decryption
               
                currBlock = this.invShiftRows(currBlock)                                                   //inverse shift rows
                currBlock = this.invSubBytes(currBlock)                                                    //inv subbytes                                                          
                currBlock = this.addRoundKey(currBlock,  (208-(j*16)  ))                                   //add round key (rom last)
                currBlock = this.TEMPInvMixColumns(currBlock)                                              //inverse mixcolumns                                                                           
            }

            currBlock = this.invShiftRows(currBlock)                                                       //inverse shift rows
            currBlock = this.invSubBytes(currBlock)                                                        //inv subbytes
            currBlock = this.addRoundKey(currBlock,0)

            currBlock = this.XOR(currBlock,this.previousCipher)
           // console.log("previous cipher",temporary)
            this.previousCipher = this.temporaryStorage("get",currBlock)//temporary

            this.pushPT(currBlock)
        }
        console.log("decrypted",this.decrypted)
        //decode from utf8
    }


    AES.prototype.invShiftRows = function(state){
        var temp = []

        temp[0]     = state[0]
        temp[5]     = state[1]
        temp[10]    = state[2]
        temp[15]    = state[3]

        temp[4]     = state[4]
        temp[9]     = state[5]
        temp[14]    = state[6]
        temp[3]    = state[7]
        
        temp[8]    = state[8]
        temp[13]     = state[9]
        temp[2]     = state[10]
        temp[7]    = state[11]

        temp[12]    = state[12]
        temp[1]     = state[13]
        temp[6]     = state[14]
        temp[11]    = state[15]
        
        return temp;
    }


    AES.prototype.invSubBytes = function(state)
    {
        var i;
        for(i=0;i<16;i++)
        {
                state[i] = this.invsBox[state[i]]
        }
        return state;
    }

    AES.prototype.XOR = function(state,block)
    {
        var i;temp = []
        for(i=0;i<16;i++)
        {
            temp.push(state[i] ^ block[i])
        }
        return temp;
    }

    AES.prototype.pushPT = function(block)
    {
        var i ; 
        for(i=0;i<16;i++)
        {
            this.decrypted.push(block[i])
        }
        return
    }

    AES.prototype.temporaryStorage = function(swi,state)
    { var i=0,temp=[];
        switch(swi){
            case "set": this.temporary = []
                    for(i=0;i<16;i++)
                    {
                        this.temporary.push(state[i])
                    }
                    return
                    break;
            case "get":
                    for(i=0;i<16;i++)
                    {
                        temp.push(this.temporary[i])
                    }
                    return temp;
                    break;
        }
    }

    AES.prototype.xtime = function(x){ 
        return (((x << 1) & 0xfe) ^ (((x >> 7) & 1) * 0x1b)) //return ((x << 1) ^ (((x >> 7) & 1) * 0x1b)) 
    }
    AES.prototype.Multiply = function(x, y){
        var t =  (((y & 1) * x) ^ ((y >> 1 & 1) * this.xtime(x)) ^ ((y >> 2 & 1) * this.xtime(this.xtime(x))) ^ ((y >> 3 & 1) * this.xtime(this.xtime(this.xtime(x)))) ^ ((y >> 4 & 1) * this.xtime(this.xtime(this.xtime(this.xtime(x))))));
        return t;
    }



    AES.prototype.keyExpand = function()    {
        var t = [0,0,0,0];
        var c = 32;
        var i = 1;
        var a;
        while(c < 240)
        {
            // Copy the temporary variable over 
            for(a = 0; a < 4; a++) 
                    t[a] = this.key[a + c - 4]; 
            // Every eight sets, do a complex calculation 
            if(c % 32 == 0) {
                   t= this.schedule_core(t,i);
            i++;
        }
            // For 256-bit keys, we add an extra sbox to the
             //calculation 
            if(c % 32 == 16) 
            {
                    for(a = 0; a < 4; a++) 
                            t[a] = this.sBox[t[a]];
            }
            for(a = 0; a < 4; a++) 
            {
                    this.key[c] = this.key[c - 32] ^ t[a];
                    c++;
            }
        }
    }
        





AES.prototype.rotate = function(inc) {
    var c;
    var temp  = inc[0];
    for(c=0;c<3;c++) 
            inc[c] = inc[c + 1];
    inc[3] = temp;
    return inc;
}

// Calculate the rcon used in key expansion 
AES.prototype.rcon = function(inc) {
    var c=1;
    if(inc == 0)  
            return 0; 
    while(inc != 1) {
    var b;
    b = c & 0x80;
    c <<= 1;
    if(b == 0x80) {
        c ^= 0x1b;
    }
            inc--;
    }
    return c;
}

//This is the core key expansion, which, given a 4-byte value,
// does some scrambling 
AES.prototype.schedule_core = function(inc,i) {
    var a;
    // Rotate the input 8 bits to the left 
    inc = this.rotate(inc);
    // Apply Rijndael's s-box on all 4 bytes 
    for(a = 0; a < 4; a++) 
            inc[a] = this.sBox[inc[a]];
    // On just the first byte, add 2^i to the byte 
    inc[0] ^= this.rcon(i);
    return inc;
}





    
/*
    encrypt(data)
    {
        
    }

    subBytes()
    {

    }

    shiftRows()
    {

    }

    mixColumns()
    {

    }

*/


AES.prototype.TEMPMixColumns = function(state)
{
  var i, Tmp, Tm, t;
  for (i = 0; i < 4; ++i)
  {  
    t   = state[i*4];
    Tmp = state[i*4] ^ state[i*4+1] ^ state[i*4+2] ^ state[i*4+3] ;
    Tm  = state[i*4] ^ state[i*4+1]  ;
    Tm = this.xtime(Tm);  
    state[i*4+0] ^= Tm ^ Tmp ;
    Tm  = state[i*4+1] ^ state[i*4+2] ; Tm = this.xtime(Tm);  state[i*4+1] ^= Tm ^ Tmp ;
    Tm  = state[i*4+2] ^ state[i*4+3] ; Tm = this.xtime(Tm);  state[i*4+2] ^= Tm ^ Tmp ;
    Tm  = state[i*4+3] ^ t ;              Tm = this.xtime(Tm);  state[i*4+3] ^= Tm ^ Tmp ;

    
  }
  return state
}


AES.prototype.TEMPInvMixColumns = function( state)
{
  var i, a, b, c, d;
  for (i = 0; i < 4; ++i)
  { 
    a = state[i*4+0];
    b = state[i*4+1];
    c = state[i*4+2];
    d = state[i*4+3];

    state[i*4+0] = this.Multiply(a, 0x0e) ^ this.Multiply(b, 0x0b) ^ this.Multiply(c, 0x0d) ^ this.Multiply(d, 0x09);
    state[i*4+1] = this.Multiply(a, 0x09) ^ this.Multiply(b, 0x0e) ^ this.Multiply(c, 0x0b) ^ this.Multiply(d, 0x0d);
    state[i*4+2] = this.Multiply(a, 0x0d) ^ this.Multiply(b, 0x09) ^ this.Multiply(c, 0x0e) ^ this.Multiply(d, 0x0b);
    state[i*4+3] = this.Multiply(a, 0x0b) ^ this.Multiply(b, 0x0d) ^ this.Multiply(c, 0x09) ^ this.Multiply(d, 0x0e) ;
  }
  return state
}

AES.prototype.testing = function()
{
    var state = [0, 1, 2, 3,
                 4, 5, 6, 7,
                 8, 9, 10,11,
                 12,13,14,15]


                
    
                 state = this.addRoundKey(state,48)

                 state = this.subBytes(state)
                 state = this.shiftRows(state)
                 state = this.TEMPMixColumns(state)
                 state = this.addRoundKey(state,64)

                 state = this.subBytes(state)
                 state = this.shiftRows(state)
                 state = this.addRoundKey(state,80)

                 state = this.addRoundKey(state,80)
                 state = this.invShiftRows(state)
                 state = this.invSubBytes(state)
                 

                 state = this.addRoundKey(state,64)
                 state = this.TEMPInvMixColumns(state)
                 state = this.invShiftRows(state)
                 state = this.invSubBytes(state)

                 state = this.addRoundKey(state,48)

                 console.log("teasting",state)

    console.log("testing subbytes")
    state = this.subBytes(state)
    console.log(state)
    state = this.invSubBytes(state)
    console.log(state)

    console.log("testing shift rows")
    state = this.shiftRows(state)
    console.log(state)
    state = this.invShiftRows(state)
    console.log(state)

    console.log('testing mixcol')
    state = this.TEMPMixColumns(state)
    console.log(state)
    state = this.TEMPInvMixColumns(state)
    console.log(state)

    console.log('testing roundkey',this.key)
    state = this.addRoundKey(state,80)
    console.log(state)
    state = this.addRoundKey(state,80)
    console.log(state)
}







    AES.prototype.test = function()
    {
        console.log(this.key.toString())
        console.log(this.key.length)
    }

















function _base64ToArrayBuffer(base64) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes =[]// new Array();//Uint8Array
    for (var i = 0; i < len; i++)        {
        bytes.push( binary_string.charCodeAt(i));
    }
    return bytes;
}
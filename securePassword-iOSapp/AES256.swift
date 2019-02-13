//
//  AES256.swift
//  securePassword
//
//  Created by Jay Naik on 20/07/18.
//  Copyright © 2018 Jay Naik. All rights reserved.
//

import Foundation

class AES
{
    var key = Data()
    var iv = Data()
    var cipher = Data()
    
    var previousBlock = Data()
    var previousCipher = Data()
    
    let sBox: [UInt8] = [ 0x63,0x7c,0x77,0x7b,0xf2,0x6b,0x6f,0xc5,0x30,0x01,0x67,0x2b,0xfe,0xd7,0xab,0x76,
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
                          0x8c,0xa1,0x89,0x0d,0xbf,0xe6,0x42,0x68,0x41,0x99,0x2d,0x0f,0xb0,0x54,0xbb,0x16 ]
    
    let invsBox:[UInt8] =
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
    ]
    
    
    init(key: String, iv: String)
    {
        self.key = self.keyExpand(key)
        
        self.iv = (Data.init(base64Encoded: iv))!
        
        print("key",self.key)
        print("iv",self.iv)
        
        self.previousBlock = self.iv
        self.previousCipher = self.iv
    }
    
    
    func test()
    {
        /*var a=0
         key.forEach({ i in
         print(i)    // i is each byte in the Data object
         print(key[a])   //accessing single byte also popssible by simlpy upassing an index instead of iterating through all bytes
         a += 1
         })*/
        encrypt(string: "it's not coming")
        
    }
    
    func base64Cipher() -> String
    {
        return self.cipher.base64EncodedString()
    }
    
    
    
    //ENCRYPT
    
    
    func encrypt(string data: String) -> Void
    {
        var currblock = Data()
        var pt = Data(data.utf8)
        let lastBytes = pt.count % 16
        var plainText =  Data()
        //console.log(pt.length)
        print("plaintext",pt.bytes)
        if(lastBytes != 0)
        {
            let padding = 16 - lastBytes
            for _ in 0..<padding
            {
                pt.append(0x00)                                                             //Add padding to complete the data in multiple of 16 bytes
            }
            plainText = pt
            pt.removeAll()
        }
        else
        {   plainText = pt  }
        
        //console.log(plainText.length)    //32
        if(plainText.count % 16 == 0)
        {
            let blocks = plainText.count / 16;
            
            
            
            for i in 0..<blocks                                                           //for each block of plainetext as CBC
            {
                currblock = get16BytesBlock(plainText,i)                           //read new 16 bytes of plain text
                currblock = CBCXOR(currblock)                                    //XOR plaintext block with previous cipher block or initialisation vector for first block
                
                currblock = addRoundKey(currblock,0)                               //initial round add round key (first 128 bits of key)
                
                for j in 0..<13                                                       // 13 Rounds of encryption
                {
                    currblock = self.subBytes(currblock)
                    currblock = self.shiftRows(currblock)
                    currblock = self.MixColumns(currblock)//this.mixColumns(currblock)
                    currblock = self.addRoundKey(currblock,(j+1)*16)
                }
                //Final(14th) round without mix columns
                currblock = self.subBytes(currblock)
                currblock = self.shiftRows(currblock)
                currblock = self.addRoundKey(currblock,224)
                
                self.end(currblock)                                                     //append cipher and store it to add to next block of plain text
            }
            print("encrypted",self.cipher.bytes)
            
            
            
        }
        else
        {
            print("Plain Text not in multiple of 16")
        }
        
    }
    
    private func get16BytesBlock(_ pt: Data,_ i:Int) -> Data {
        var temp = Data()
        for j in (i*16)..<(16*(i+1))
        {
            temp.append(pt[j])
        }
        return temp
    }
    
    private func CBCXOR(_ currBlock: Data) -> Data {
        var temp = Data()
        for j in 0..<16
        {
            temp.append( self.previousBlock[j] ^ currBlock[j])
        }
        return temp;
    }
    
    
    private func subBytes(_ block:Data) -> Data {
        var temp = block
        for i in 0..<16 {
            let t = Int.init(block[i])
            temp[i] = sBox[t]
        }
        return temp
    }
    
    private func shiftRows(_ state: Data) -> Data {
        var temp = state
        
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
    
    private func MixColumns(_ block: Data) -> Data
    {
        var  Tmp = UInt8(), Tm = UInt8(), t = UInt8()
        var state = block
        for i in 0..<4
        {
            t   = state[i*4];
            Tmp = state[i*4] ^ state[i*4+1] ^ state[i*4+2] ^ state[i*4+3] ;
            Tm  = state[i*4] ^ state[i*4+1]  ;
            Tm = xtime(Tm);
            state[i*4+0] ^= Tm ^ Tmp ;
            Tm  = state[i*4+1] ^ state[i*4+2] ; Tm = xtime(Tm);  state[i*4+1] ^= Tm ^ Tmp ;
            Tm  = state[i*4+2] ^ state[i*4+3] ; Tm = xtime(Tm);  state[i*4+2] ^= Tm ^ Tmp ;
            Tm  = state[i*4+3] ^ t ;              Tm = xtime(Tm);  state[i*4+3] ^= Tm ^ Tmp ;
            
            
        }
        return state
    }
    
    
    private func addRoundKey(_ state: Data,_ first: Int) -> Data {
        var temp = state
        for i in 0..<16
        {
            temp[i] ^= self.key[i + first]
        }
        return temp
    }
    
    private func end(_ state: Data) -> Void {        //CHANGE NAME TO SAVE CIPHER LATER
        self.previousBlock.removeAll()
        for i in 0..<16
        {
            self.previousBlock.append(state[i])
            self.cipher.append(state[i])
        }
        return
    }
    
    
    
    
    
    private func xtime(_ x: UInt8 ) -> UInt8 {
        return (((x << 1) & 0xfe) ^ (((x >> 7) & 1) * 0x1b)) //return ((x << 1) ^ (((x >> 7) & 1) * 0x1b))
    }
    
    private func Multiply(x: UInt8 , y: UInt8) -> UInt8 {
        let a =  ((y & 1) * x)
        let b =  ((y >> 1 & 1) * self.xtime(x))
        let c =  ((y >> 2 & 1) * self.xtime(xtime(x)))
        let d =  ((y >> 3 & 1) * xtime(xtime(xtime(x))))
        let e =  ((y >> 4 & 1) * xtime(xtime(xtime(xtime(x)))));
        return a^b^c^d^e;
    }
    
    
    
    
    
    
    
    private func keyExpand(_ base64_key: String)  -> Data  {
        var key = Data.init(base64Encoded: base64_key)!
        print(key)
        var t:[UInt8] = [0,0,0,0]
        var c = 32
        var i:UInt8 = 1
        while(c < 240)
        {
                print(c)
            // Copy the temporary variable over
            for a in 0..<4 {
                t[a] = key[a + c - 4]
            }
            // Every eight sets, do a complex calculation
            if(c % 32 == 0) {
                t = schedule_core(t,i)
                i += 1
            }
            // For 256-bit keys, we add an extra sbox to the
            //calculation
            if(c % 32 == 16)
            {
                for a in 0..<4 {
                    let temp = Int.init(t[a])
                    t[a] = sBox[temp]
                }
            }
            for a in 0..<4{
                key.append( key[c - 32] ^ t[a] )
                c = c + 1
            }
        }
        return key
    }
    
    
    
    
    private func rcon(_ inc: UInt8) -> UInt8 {
        var c:UInt8=1,i:UInt8 = inc
        
        if(i == 0){
            return 0
        }
        while(i != 1) {
            let b = c & 0x80;
            c <<= 1;
            if(b == 0x80) {
                c ^= 0x1b;
            }
            i -= 1;
        }
        return c;
    }
    
    private func rotate(_ inc: [UInt8]) -> [UInt8] {
        var i = inc
        let temp  = inc[0];
        for c in 0..<3
        {
            i[c] = inc[c + 1];
            i[3] = temp;
        }
        return i;
    }
    
    private func schedule_core(_ inc:[UInt8],_ i: UInt8) -> [UInt8] {
        
        // Rotate the input 8 bits to the left
        var in_c:[UInt8] = rotate(inc);
        // Apply Rijndael's s-box on all 4 bytes
        for a in 0..<4 {
            let temp = Int.init(in_c[a])
            in_c[a] = self.sBox[temp];
        }
        // On just the first byte, add 2^i to the byte
        in_c[0] ^= rcon(i);
        return in_c;
    }
    
}

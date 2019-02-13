//
//  socketio.swift
//  securePassword
//
//  Created by Jay Naik on 04/07/18.
//  Copyright © 2018 Jay Naik. All rights reserved.
//

import Foundation
import SocketIO

class SocketIOManager: NSObject {
    
    static let sharedInstance = SocketIOManager()
    var socket = SocketIOClient(manager: URL(string: "http://192.168.1.106:3000/getcipher")! as! SocketManagerSpec, nsp: "iphone")
   

    override init() {
        super.init()
        
        //socket.joinNamespace("/swift") // Create a socket for the /swift namespac
        socket.on(clientEvent: .connect) {data, ack in
            print("socket connected \(data)")
            
            self.socket.emit(
                "client join", ["id":"clientId", "identifier":"identifier"]
            )
            
        }
        
        socket.on("client balance change") { dataArray, ack in
            print("socket connected \(dataArray)")
        }
        
        
}
    
    func establishConnection() {
        socket.connect()
    }
    
    func closeConnection() {
        socket.disconnect()
    }

    func send(str: String)
    {
        self.socket.emit("test", ["data":"data is here"+str])
    }



}





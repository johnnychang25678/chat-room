package main

import (
	"fmt"
	"log"
	"net/http"

	socketio "github.com/googollee/go-socket.io"
	"github.com/rs/cors"
)

type User struct {
	Id   string
	Name string
}

var NameSet map[string]User = make(map[string]User)
var connectedNames []string = make([]string, 0)

// type Message struct {
// 	From    string `json:"from"`
// 	Content string `json:"content"`
// }

func main() {
	server := socketio.NewServer(nil) // client has to be version 1.x
	server.OnConnect("/", func(s socketio.Conn) error {
		s.SetContext("")
		fmt.Println("connected:", s.ID())
		return nil
	})

	// add names
	server.OnEvent("/", "names", func(s socketio.Conn, name string) {
		fmt.Println("received name: ", name)
		_, ok := NameSet[name]
		if !ok {
			NameSet[name] = User{Id: s.ID(), Name: name}
			connectedNames = append(connectedNames, name)
		}

		server.BroadcastToNamespace("/", "names-list", connectedNames)
	})

	server.OnEvent("/", "chat", func(s socketio.Conn, msg string) {
		fmt.Println("chat:", msg)
		server.BroadcastToNamespace("/", "chat", msg)
	})

	server.OnEvent("/", "bye", func(s socketio.Conn) string {
		last := s.Context().(string)
		s.Emit("bye", last)
		s.Close()
		return last
	})

	server.OnError("/", func(s socketio.Conn, e error) {
		fmt.Println("meet error:", e)
	})

	// this will trigger when user close the window
	// TODO: graceful close ws??
	server.OnDisconnect("/", func(s socketio.Conn, reason string) {
		fmt.Println("disconneted by client, reason:", reason)
		// remove from NameSet
		for name, user := range NameSet {
			if user.Id == s.ID() {
				delete(NameSet, name)
			}
		}
		// remove from connectedNames and broadcast it
		newConnectedNames := make([]string, 0)
		for name := range NameSet {
			newConnectedNames = append(newConnectedNames, name)
		}
		connectedNames = newConnectedNames
		server.BroadcastToNamespace("/", "names-list", connectedNames)
	})

	go server.Serve()
	defer server.Close()

	mux := http.NewServeMux()

	mux.Handle("/socket.io/", server) // socket io

	log.Println("Serving at localhost:8080...")

	corsSetting := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "http://127.0.0.1:5500"},
		AllowCredentials: true,
	})

	log.Fatal(http.ListenAndServe(":8080", corsSetting.Handler(mux)))
}

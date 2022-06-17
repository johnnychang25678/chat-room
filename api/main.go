package main

import (
	"fmt"
	"log"
	"net/http"

	socketio "github.com/googollee/go-socket.io"
	"github.com/rs/cors"
)

func main() {
	server := socketio.NewServer(nil) // client has to be version 1.x
	server.OnConnect("/", func(s socketio.Conn) error {
		s.SetContext("")
		fmt.Println("connected:", s.ID())
		return nil
	})

	connectedNames := make([]string, 0)
	// add names
	server.OnEvent("/", "names", func(s socketio.Conn, name string) {
		fmt.Println("received name: ", name)
		connectedNames = append(connectedNames, name)
		server.BroadcastToNamespace("/", "names-list", connectedNames)
	})

	server.OnEvent("/", "notice", func(s socketio.Conn, msg string) {
		fmt.Println("notice:", msg)
		server.BroadcastToNamespace("/", "reply", "have "+msg)
		// s.Emit("reply", "have "+msg)
	})

	server.OnEvent("/chat", "msg", func(s socketio.Conn, msg string) string {
		s.SetContext(msg)
		return "recv " + msg
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

	server.OnDisconnect("/", func(s socketio.Conn, reason string) {
		fmt.Println("closed", reason)
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

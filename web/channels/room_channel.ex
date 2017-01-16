defmodule RedisPubsubSample.RoomChannel do
  use Phoenix.Channel
  require Logger

  def join("room:lobby", _auth_msg, socket) do
    {:ok, socket}
  end
  def join("room:" <> _private_rood, _auth_msg, socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_in("send_message", %{"message" => message}, socket) do
    Logger.debug message
    broadcast! socket, "receive_message", %{message: message}
    {:noreply, socket}
  end
end

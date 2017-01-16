defmodule RedisPubsubSample.PageController do
  use RedisPubsubSample.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end

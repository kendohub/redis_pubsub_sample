use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :redis_pubsub_sample, RedisPubsubSample.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :redis_pubsub_sample, RedisPubsubSample.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "redis_pubsub_sample_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

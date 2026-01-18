# Bun Template

To install dependencies:

```bash
bun install
```

To start a development server:

```bash
bun run dev
```

To run for production:

```bash
bun run start
```

## Setup

### Generate encrypted .env using `dotenvx`

To use encrypted secrets which can be checked in:

```bash
echo "HELLO=World" > .env && dotenvx encrypt
```

### Add `node_modules/.bin/` to `$PATH`

For convenience. Must be done once per device:

```bash
direnv allow
```
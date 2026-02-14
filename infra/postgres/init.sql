CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(254) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    pass_hash VARCHAR(60) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ,
    email_verified BOOLEAN DEFAULT FALSE
);
CREATE TABLE sessions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    device TEXT,
    ip INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL,
    last_used_at TIMESTAMPTZ,
    revoked BOOLEAN DEFAULT FALSE
);
CREATE TABLE refresh_tokens (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(36) NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    token_hash TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    revoked BOOLEAN DEFAULT FALSE
)
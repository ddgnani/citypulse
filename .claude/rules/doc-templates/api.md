# API Documentation

## Authentication
<!-- Describe the auth mechanism (e.g., Bearer token, API key, session cookie) and how to obtain credentials. -->

## Base URL
```
https://your-domain.com/api
```

---

## Endpoints

### `METHOD /path`

**Description**:
**Auth required**: Yes / No

**Request**

```json
{
}
```

**Response — `200 OK`**

```json
{
}
```

**Error Responses**

| Status | Meaning |
|--------|---------|
| 400 | Bad request — invalid input |
| 401 | Unauthorized — missing or invalid token |
| 404 | Not found |
| 500 | Internal server error |

---

<!-- Copy the endpoint block above for each additional endpoint. -->

const config = {
	port: 3000,
	privateKEY: `-----BEGIN RSA PRIVATE KEY-----	MIIBOwIBAAJBAIKdP9VACWLTqN5zzPpDHok7UgvXus0EA61l8QLUpZHXZj8JFSYk	iew9StqeIfkhOJTNgNMuNzSFlUg0vFEQhgMCAwEAAQJALggva/+Sj0LbO/MB5Z1s	EJ9YbhYMnp5wkVbhFsdMxtXokm7GIhTP2OK6f2NqiCfRHo7AqFdkD0FY+yt4Yxe2	SQIhAN+HQ5hHM3n7Ojal1EzzIUOru9Y9OSMmaytUHjSVudc9AiEAlZagmycyY+0J	pbYrVhNaEGTR4Jh2Mup/cz84JuX/pj8CIQC3YlrDaM7Dqaf1w5DsXJ+SzCb7uhjR	TKip0IZDb/8apQIgTSMecMOWrYa3Odeloz5ZbCjBPYMBOKJJ1KEeEJj76rsCIQDb	0MKKiUKZYzLJuUJbkThhd5mL+nK+985ezIHujIGoCQ==	-----END RSA PRIVATE KEY-----`,
	publicKEY: `-----BEGIN PUBLIC KEY-----
	MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIKdP9VACWLTqN5zzPpDHok7UgvXus0E
	A61l8QLUpZHXZj8JFSYkiew9StqeIfkhOJTNgNMuNzSFlUg0vFEQhgMCAwEAAQ==
	-----END PUBLIC KEY-----`,
	signOptions: {
		issuer: 'clashofmeme corp',
		subject: 'jean-david Nelson',
		expiresIn: "12h"
	},
	urlDatabase: 'mongodb://localhost:27017/admin'
};

export default {
	config
}
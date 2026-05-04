ALTER TABLE "auth_accounts" RENAME TO "accounts";--> statement-breakpoint
ALTER TABLE "auth_sessions" RENAME TO "sessions";--> statement-breakpoint
ALTER TABLE "auth_users" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "auth_verification_tokens" RENAME TO "verification_tokens";--> statement-breakpoint
ALTER TABLE "sessions" DROP CONSTRAINT "auth_sessions_session_token_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "auth_users_username_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "auth_users_email_unique";--> statement-breakpoint
ALTER TABLE "accounts" DROP CONSTRAINT "auth_accounts_user_id_auth_users_id_fk";
--> statement-breakpoint
ALTER TABLE "sessions" DROP CONSTRAINT "auth_sessions_user_id_auth_users_id_fk";
--> statement-breakpoint
DROP INDEX "auth_accounts_provider_account_idx";--> statement-breakpoint
ALTER TABLE "verification_tokens" DROP CONSTRAINT "auth_verification_tokens_identifier_token_pk";--> statement-breakpoint
ALTER TABLE "verification_tokens" ADD CONSTRAINT "verification_tokens_identifier_token_pk" PRIMARY KEY("identifier","token");--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_provider_account_idx" ON "accounts" USING btree ("provider","provider_account_id");--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "username";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "first_name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "last_name";--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_session_token_unique" UNIQUE("session_token");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");
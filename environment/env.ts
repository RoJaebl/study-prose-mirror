import * as dotenv from "dotenv";
import * as path from "path";
import { z, ZodError } from "zod";

const envSchema = z
  // 공통 환경변수 스키마
  .object({
    TAILWIND_CONFIG: z.string().default("config/style/tailwind.config.ts"),
    ASSET_PATH: z.string().default("./"),
  })
  // 환경변수 스키마
  .extend({
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    CSS_BUNDLER: z
      .enum(["style-loader", "mini-css-extract"])
      .default("style-loader"),
    ENABLE_SOURCE_MAP: z
      .string()
      .transform((val) => val === "true")
      .default("false"),
  });

// 환경변수 타입
type Env = z.infer<typeof envSchema>;

class EnvironmentError extends Error {
  constructor(public errors: ZodError) {
    super("Invalid environment variables");
    this.name = "EnvironmentError";
  }
}

class Environment {
  static loadFile(filePath: string): Record<string, string | undefined> {
    return dotenv.config({ path: filePath }).parsed || {};
  }

  static validate(env: Record<string, unknown>): Env {
    try {
      return envSchema.parse(env);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new EnvironmentError(error);
      }
      throw error;
    }
  }

  // 환경변수 로드 및 검증
  static load(): Env {
    try {
      const commonEnv = this.loadFile(
        path.resolve(process.cwd(), "environment/.env.common")
      );

      const envFile =
        process.env.NODE_ENV === "production"
          ? "environment/.env.production"
          : "environment/.env.development";
      const env = this.loadFile(path.resolve(process.cwd(), envFile));

      return this.validate({ ...commonEnv, ...env });
    } catch (error) {
      if (error instanceof EnvironmentError) {
        console.error(
          "Invalid environment variables:",
          JSON.stringify(error.errors.errors, null, 2)
        );
        process.exit(1);
      }
      throw error;
    }
  }
}

export default Environment.load();

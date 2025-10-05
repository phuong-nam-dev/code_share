import { redirect } from "next/navigation";
import {
  createErrorReturn,
  createSuccessReturn,
  DalError,
  DalReturn,
  ThrowableDalError,
} from "./types";
import { DrizzleQueryError } from "drizzle-orm";
import { user as UserTable } from "@/drizzle/schema";
import { getCurrentUser } from "@/lib/auth/get-current-user";

export function dalLoginRedirect<T, E extends DalError>(
  dalReturn: DalReturn<T, E>
) {
  if (dalReturn.success) return dalReturn;
  if (dalReturn.error.type === "no-user") return redirect("/login");

  return dalReturn as DalReturn<T, Exclude<E, { type: "no-user" }>>;
}

export function dalFormatErrorMessage(error: DalError) {
  const type = error.type;

  switch (error.type) {
    case "no-user":
      return "You must be logged in to perform this action.";
    case "no-access":
      return "You do not have permission to perform this action.";
    case "drizzle-error":
      return `A database error occurred`;
    case "unknown-error":
      return `An unknown error occurred`;
    default:
      throw new Error(`Unhandled error type: ${type as never}`);
  }
}

export async function dalDbOperation<T>(operation: () => Promise<T>) {
  try {
    const data = await operation();
    return createSuccessReturn(data);
  } catch (e) {
    if (e instanceof ThrowableDalError) {
      return createErrorReturn(e.dalError);
    }
    if (e instanceof DrizzleQueryError) {
      return createErrorReturn({ type: "drizzle-error", error: e });
    }
    return createErrorReturn({ type: "unknown-error", error: e });
  }
}

export async function dalRequireAuth<T, E extends DalError>(
  operation: (user: typeof UserTable.$inferSelect) => Promise<DalReturn<T, E>>
) {
  const user = await getCurrentUser();

  if (user == null) {
    return createErrorReturn({ type: "no-user" });
  }

  return operation(user);
}

export function dalThrowError<T, E extends DalError>(
  dalReturn: DalReturn<T, E>
) {
  if (dalReturn.success) return dalReturn;

  throw dalReturn.error;
}

export function dalUnauthorizedRedirect<T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
  redirectPath = "/"
) {
  if (dalReturn.success) return dalReturn;
  if (dalReturn.error.type === "no-access") return redirect(redirectPath);

  return dalReturn as DalReturn<T, Exclude<E, { type: "no-access" }>>;
}

export function dalVerifySuccess<T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
  { unauthorizedRedirectPath }: { unauthorizedRedirectPath?: string } = {}
): T {
  const res = dalThrowError(
    dalUnauthorizedRedirect(
      dalLoginRedirect(dalReturn),
      unauthorizedRedirectPath
    )
  );
  return res.data;
}

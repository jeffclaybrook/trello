/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetcher<T = any>(
 input: RequestInfo,
 init?: RequestInit
): Promise<T> {
 const res = await fetch(input, init)

 if (!res.ok) {
  throw new Error("Failed to fetch")
 }

 return res.json() as Promise<T>
}
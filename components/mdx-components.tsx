import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import type { AnchorHTMLAttributes } from "react";

function MdxLink({
  href = "",
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

function MdxImage(props: ImageProps) {
  return (
    <Image
      {...props}
      alt={props.alt ?? ""}
      width={typeof props.width === "number" ? props.width : 1200}
      height={typeof props.height === "number" ? props.height : 630}
      className="rounded-lg"
    />
  );
}

export const mdxComponents: MDXComponents = {
  a: MdxLink,
  img: MdxImage as unknown as MDXComponents["img"],
};

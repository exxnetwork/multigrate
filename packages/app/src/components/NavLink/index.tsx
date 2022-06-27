import Link, { LinkProps } from "next/link";
import React, { Children } from "react";

import { useRouter } from "next/router";

// const NavLink = ({ children, exact = false, activeClassName = 'text-high-emphesis', ...props }) => {
//   const { asPath, pathname, route, query, basePath } = useRouter()
//   const child = Children.only(children)
//   const childClassName = child.props.className || ''

//   // pages/index.js will be matched via props.href
//   // pages/about.js will be matched via props.href
//   // pages/[slug].js will be matched via props.as

//   const isActive = exact
//     ? (props.as || props.href.pathname || props.href) === asPath
//     : asPath.startsWith(props.as || props.href.pathname || props.href)

//   const className = isActive ? `${childClassName} ${activeClassName}`.trim() : childClassName

//   // console.log({ asPath, pathname, route, query })

//   return (
//     <Link href={props.href} {...props}>
//       {React.cloneElement(child, {
//         className: className || null,
//       })}
//     </Link>
//   )
// }

// export default NavLink

interface NavLinkProps {
  icon: JSX.Element;
  label: string;
  href?: string;
  exact?: boolean;
  pathname?: string;
  className?: string;
  button?: boolean;
  link?: boolean;
  onClick?: () => void;
}

const NavLink = ({
  icon,
  label,
  exact = false,
  pathname,
  href,
  button = false,
  className,
  onClick,
}: NavLinkProps) => {
  const { asPath, push } = useRouter();

  const isActive = exact
    ? (pathname || href) === asPath
    : asPath.startsWith(pathname || href);

  return (
    <div
      onClick={() => {
        button ? onClick() : push(href || "/migrator");
      }}
      className={`pl-12 py-3 flex gap-x-3 items-center cursor-pointer font-semibold font-outfit text-base hover:text-dark dark:hover:text-grey relative ${
        isActive
          ? "text-dark dark:text-white bg-lightGreen"
          : "text-grey5 dark:text-[#ffffff40]"
      }`}
    >
      <div> {icon}</div>
      <h1 className={`${className && className}`}>{label}</h1>

      {isActive && (
        <div className="border-8 border-accent rounded-2xl h-full absolute -left-[10px]"></div>
      )}
    </div>
  );
};

export default NavLink;

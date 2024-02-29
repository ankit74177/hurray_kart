import { NavLink } from '@remix-run/react';
import { useRootLoaderData } from '~/root';
import { Newsletter } from './NewsletterForm';
/**
 * @param {FooterQuery & {shop: HeaderQuery['shop']}}
 */
export function Footer({ menu, shop }) {
  return (
    <footer className="footer">
      <FooterMenu menu={menu} primaryDomainUrl={shop.primaryDomain.url} />
    </footer>
  );
}

/**
 * @param {{
 *   menu: FooterQuery['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 * }}
 */
function FooterMenu({ menu, primaryDomainUrl }) {
  const { publicStoreDomain } = useRootLoaderData();
  console.log('menu', menu);
  return (
    <nav className="footer-menu" role="navigation">
      {/* {(menu).items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })} */}
      {(menu).items.map((menuItem) => (
        <div key={menuItem.id}>
          <h3>{menuItem.title}</h3>
          <ul>
            {menuItem.items.map((item) => {
              if (!item.url) return null;
              // if the url is internal, we strip the domain
              const url =
                item.url.includes('myshopify.com') ||
                  item.url.includes(publicStoreDomain) ||
                  item.url.includes(primaryDomainUrl)
                  ? new URL(item.url).pathname
                  : item.url;
              const isExternal = !url.startsWith('/');
              return isExternal ? (
                <li>
                  <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
                    {item.title}
                  </a>
                </li>
              ) : (
                <li>
                <NavLink
                  end
                  key={item.id}
                  prefetch="intent"
                  style={activeLinkStyle}
                  to={url}
                >
                  {item.title}
                </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <Newsletter></Newsletter>
    </nav>
  );
}
/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({ isActive, isPending }) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}



/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */

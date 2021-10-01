import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Breadcrumb {
  label: string;
  href: string;
}

export default function useBreadcrumbs({
  homeLabel = "Home",
  includeQueryParams = false,
} = {}): Breadcrumb[] | null {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  const resolveLabel = (path: string, i: number): string => {
    switch (true) {
      case i === 0:
        return homeLabel;
      case !includeQueryParams:
        return path.split("?")[0];
      default:
        return path;
    }
  };

  useEffect(() => {
    if (router) {
      const paths = router.asPath.split("/").map((path, i) => {
        return {
          label: resolveLabel(path, i),
          href: "/" + path,
        };
      });

      setBreadcrumbs(paths);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return breadcrumbs;
}

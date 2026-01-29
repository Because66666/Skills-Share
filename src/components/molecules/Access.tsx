import React, { createContext, useContext, ReactNode } from 'react';

interface AccessContextType {
  roles: string[];
  permissions: string[];
}

const AccessContext = createContext<AccessContextType>({
  roles: [],
  permissions: [],
});

export interface AccessProviderProps {
  roles?: string[];
  permissions?: string[];
  children: ReactNode;
}

export const AccessProvider: React.FC<AccessProviderProps> = ({
  roles = [],
  permissions = [],
  children,
}) => {
  return (
    <AccessContext.Provider value={{ roles, permissions }}>
      {children}
    </AccessContext.Provider>
  );
};

export const useAccess = () => useContext(AccessContext);

export interface AccessProps {
  accessible?: boolean | ((context: AccessContextType) => boolean);
  role?: string | string[];
  permission?: string | string[];
  fallback?: ReactNode;
  children: ReactNode;
}

export const Access: React.FC<AccessProps> = ({
  accessible,
  role,
  permission,
  fallback = null,
  children,
}) => {
  const context = useAccess();

  // 1. Direct accessible prop check
  if (typeof accessible === 'boolean') {
    return accessible ? <>{children}</> : <>{fallback}</>;
  }
  if (typeof accessible === 'function') {
    return accessible(context) ? <>{children}</> : <>{fallback}</>;
  }

  // 2. Role check
  if (role) {
    const requiredRoles = Array.isArray(role) ? role : [role];
    const hasRole = requiredRoles.some((r) => context.roles.includes(r));
    if (!hasRole) return <>{fallback}</>;
  }

  // 3. Permission check
  if (permission) {
    const requiredPermissions = Array.isArray(permission) ? permission : [permission];
    const hasPermission = requiredPermissions.some((p) => context.permissions.includes(p));
    if (!hasPermission) return <>{fallback}</>;
  }

  return <>{children}</>;
};

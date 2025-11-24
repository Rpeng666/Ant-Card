'use client';

import { LoginWrapper } from '@/components/auth/login-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useCurrentPlan } from '@/hooks/use-payment';
import { Link, usePathname } from '@/i18n/routing.public';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  CrownIcon,
  Loader2Icon,
  LockIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

interface PremiumGuardProps {
  children: ReactNode;
  isPremium: boolean;
  canAccess?: boolean;
  className?: string;
}

export function PremiumGuard({
  children,
  isPremium,
  canAccess,
  className,
}: PremiumGuardProps) {
  // All hooks must be called unconditionally at the top
  const t = useTranslations('BlogPage');
  const pathname = usePathname();
  const currentUser = useCurrentUser();
  const { data: paymentData, isLoading: isLoadingPayment } = useCurrentPlan(
    currentUser?.id
  );

  // For non-premium articles, show content immediately with no extra processing
  if (!isPremium) {
    return (
      <div className={className}>
        <div className="prose prose-neutral dark:prose-invert prose-img:rounded-lg max-w-none">
          {children}
        </div>
      </div>
    );
  }

  // Determine if user has premium access
  const hasPremiumAccess =
    paymentData?.currentPlan &&
    (!paymentData.currentPlan.isFree || paymentData.currentPlan.isLifetime);

  // If server-side check has already determined access, use that
  if (canAccess !== undefined) {
    // Server has determined the user has access
    if (canAccess) {
      return (
        <div className={className}>
          <div className="prose prose-neutral dark:prose-invert prose-img:rounded-lg max-w-none">
            {children}
          </div>
        </div>
      );
    }

    // Server determined no access, show appropriate message
    if (!currentUser) {
      return (
        <div className={className}>
          <div className="prose prose-neutral dark:prose-invert prose-img:rounded-lg max-w-none">
            {/* Show partial content before protection */}
            {children}
          </div>

          {/* Enhanced login prompt for server-side blocked content */}
          <div className="mt-16">
            <div className="w-full p-12 rounded-lg bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 border border-primary/20">
              <div className="flex flex-col items-center justify-center gap-6 text-center">
                <div className="p-4 rounded-full bg-primary/10">
                  <LockIcon className="size-8 text-primary" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">
                    {t('premiumContent.loginRequired')}
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    {t('premiumContent.loginDescription')}
                  </p>
                </div>

                <LoginWrapper mode="modal" asChild callbackUrl={pathname}>
                  <Button size="lg" className="min-w-[160px] cursor-pointer">
                    <LockIcon className="mr-2 size-4" />
                    {t('premiumContent.signIn')}
                  </Button>
                </LoginWrapper>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // If user is not logged in
  if (!currentUser) {
    return (
      <div className={className}>
        <div className="prose prose-neutral dark:prose-invert prose-img:rounded-lg max-w-none">
          {children}
        </div>

        {/* Enhanced login prompt */}
        <div className="mt-16">
          <div className="w-full p-12 rounded-lg bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 border border-primary/20">
            <div className="flex flex-col items-center justify-center gap-6 text-center">
              <div className="p-4 rounded-full bg-primary/10">
                <LockIcon className="size-8 text-primary" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  {t('premiumContent.loginRequired')}
                </h3>
                <p className="text-muted-foreground max-w-md">
                  {t('premiumContent.loginDescription')}
                </p>
              </div>

              <LoginWrapper mode="modal" asChild callbackUrl={pathname}>
                <Button size="lg" className="min-w-[160px] cursor-pointer">
                  <LockIcon className="mr-2 size-4" />
                  {t('premiumContent.signIn')}
                </Button>
              </LoginWrapper>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If payment data is still loading
  if (isLoadingPayment) {
    return (
      <div className={className}>
        <div className="prose prose-neutral dark:prose-invert prose-img:rounded-lg max-w-none">
          {children}
        </div>
        {isLoadingPayment && (
          <div className="mt-8 flex items-center justify-center text-primary font-semibold">
            <Loader2Icon className="size-5 animate-spin mr-2" />
            <span>{t('premiumContent.checkingAccess')}</span>
          </div>
        )}
      </div>
    );
  }

  // If user doesn't have premium access
  if (!hasPremiumAccess) {
    return (
      <div className={className}>
        <div className="prose prose-neutral dark:prose-invert prose-img:rounded-lg max-w-none">
          {children}
        </div>

        {/* Inline subscription banner for logged-in non-members */}
        <div className="mt-16">
          <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 border border-primary/20">
            <CardContent className="p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-primary/10">
                  <CrownIcon className="size-8 text-primary" />
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2">
                {t('premiumContent.title')}
              </h3>

              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {t('premiumContent.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Button asChild size="lg" className="min-w-[160px]">
                  <Link href="/pricing">
                    {t('premiumContent.upgradeCta')}
                    <ArrowRightIcon className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-8 flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <CheckCircleIcon className="size-4 text-primary" />
                  {t('premiumContent.benefit1')}
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircleIcon className="size-4 text-primary" />
                  {t('premiumContent.benefit2')}
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircleIcon className="size-4 text-primary" />
                  {t('premiumContent.benefit3')}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show full content for premium users
  return (
    <div className={className}>
      <div className="prose prose-neutral dark:prose-invert prose-img:rounded-lg max-w-none">
        {children}
      </div>
    </div>
  );
}

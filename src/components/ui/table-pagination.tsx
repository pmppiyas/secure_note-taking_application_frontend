'use client';

import React from 'react';
import PaginationControls, {
  PaginationControlsProps,
} from '@/components/shared/PaginationControls';

export type TablePaginationProps = PaginationControlsProps;

export default function TablePagination(props: TablePaginationProps) {
  return <PaginationControls {...props} />;
}

export { TablePagination };

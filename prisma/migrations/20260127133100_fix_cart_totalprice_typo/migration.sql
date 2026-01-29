-- Fix typo in Cart column name: totlaPrice -> totalPrice
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name IN ('Cart', 'cart')
      AND column_name = 'totlaPrice'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name IN ('Cart', 'cart')
      AND column_name = 'totalPrice'
  ) THEN
    ALTER TABLE "Cart" RENAME COLUMN "totlaPrice" TO "totalPrice";
  END IF;
END $$;

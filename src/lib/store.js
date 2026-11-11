import { useSyncExternalStore } from "react";

/**
 * 画面内の簡易データストア（メモリ上のみ。再読み込みで初期データに戻る）。
 * 一覧・詳細の両方から同じデータを参照・更新できる。
 */
export function createStore(seed) {
  let items = seed.map((item) => ({ ...item }));
  const listeners = new Set();

  const emit = () => listeners.forEach((listener) => listener());
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const getItems = () => items;

  return {
    getItems,
    /** React のフック。ストアが更新されると再描画される */
    useItems: () => useSyncExternalStore(subscribe, getItems, getItems),
    get: (id) => items.find((item) => item.id === id),
    update(id, patch) {
      items = items.map((item) =>
        item.id === id ? { ...item, ...patch, updatedAt: new Date().toISOString() } : item,
      );
      emit();
    },
    prepend(item) {
      items = [item, ...items];
      emit();
    },
  };
}

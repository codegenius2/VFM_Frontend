import React from "react";
import { Breadcrumb, Badge } from "antd";
import { useTranslation } from "react-i18next";

function Howtowear() {
  const { t, i18n } = useTranslation();
  return (
    <>
      {/* <Header page={"webscreens"} pagetitle={"HOW_TO_WEAR"}/> */}
      <section id="main-section" className="cart-section-main-1 flex">
        <div id="login" className="py-5">
          <Breadcrumb
            className="p-5"
            separator=">"
            items={[
              {
                title: "TOP_PAGE",
                href: "/",
              },
              {
                title: "HOW_TO_WEAR",
              },
            ]}
          />
          <Badge.Ribbon
            text={t("どのようにVIRTUAL FASHIONを着るのか")}
            color="red"
            className="mt-4 p-2 px-7 text-xl"
          >
            <div className="main-box-howtowear leading-loose">
              <h4 className="font-bold text-[18px] md:text-[20px] mb-3">
                クライアント（投資家）はVIRTUAL
                FASHIONを着用したい画像や動画データをチャットからアーティストへ送付
                <br />
                アーティストはVIRTUAL
                FASHIONを着用させた状態の画像や動画データを納品
              </h4>
              <div className="border-b border-gray-500 py-5">
                <h5 className="font-semibold text-[18px]">
                  クライアント（投資家）側
                </h5>
                <h6 className="font-semibold text-[16px]">
                  ■アーティスト側が登録している商品を購入する場合
                </h6>
                <p className="font-normal text-[16px]">
                  ・商品詳細ページから、気に入ったVIRTUAL
                  FASHIONを購入してください
                  <br />
                  ・オプション購入タブから、VIRTUAL
                  FASHIONを着用したい画像や動画の数量を指定してください <br />
                  ・購入完了後のチャットルームから、オプションで購入した分画像や動画をアーティストへ送信してください
                  <br />
                  ・アーティストから着用後のデータが送付されてきたら、「検収を完了する」ボタンを押し取引を終了してください
                </p>
                <h6 className="font-semibold text-[16px] mt-2">
                  ■リクエスト登録をして商品を購入する場合
                </h6>
                <p className="font-normal text-[16px]">
                  ・マイページから、ほしいVIRTUAL
                  FASHIONの詳細を登録してください <br />
                  ・リクエストに応募があったアーティストから、依頼するアーティストを決めてチャットの「リクエストを依頼する」ボタンを押してください{" "}
                  <br />
                  ・購入完了後のチャットルームから、リクエスト登録に記載のあった分の画像や動画をアーティストへ送信してください
                  <br />
                  ・アーティストから着用後のデータが送付されてきたら、「検収を完了する」ボタンを押し取引を終了してください
                </p>
              </div>
              <div className="border-b border-gray-500 py-5">
                <h5 className="font-semibold text-[18px]">アーティスト側</h5>
                <h6 className="font-semibold text-[16px]">
                  ■アーティスト側が登録している商品が購入された場合
                </h6>
                <p className="font-normal text-[16px]">
                  ・マイページの商品登録から、自身の作成したVIRTUAL
                  FASHIONを登録してください
                  <br />
                  ・クライアントが商品とオプションを購入します <br />
                  ・購入完了後のチャットルームから、オプションで購入された分画像や動画をクライアントからへ送ってもらってください
                  <br />
                  ・クライアントから送られてきた画像や動画データにVIRTUAL
                  FASHIONを着用させて、そのデータを「納品する」ボタンで納品してください{" "}
                  <br />
                  ・クライアントから「検収を完了する」ボタンが押された時点で取引が終了しまします
                </p>
                <h6 className="font-semibold text-[16px] mt-2">
                  ■クライアントのリクエストに応募する場合
                </h6>
                <p className="font-normal text-[16px]">
                  ・クライアントページのリクエスト一覧より、自身に合う依頼へ応募してください
                  <span className="text-rose-600">
                    （リクエストの場合は、着用データを含む総額です。納品希望の画像や動画を確認してください）
                  </span>{" "}
                  <br />
                  ・クライアントから「リクエストを依頼する」ボタンが押されたら取引スタートです{" "}
                  <br />
                  ・リクエスト内容に沿ったVIRTUAL
                  FASHIONを作成し、デザインについてチャットルームでやり取りを行ってください
                  <br />
                  ・チャットルームから、リクエスト登録に記載のあった分の画像や動画が送られてきます
                  <br />
                  ・クライアントから送られてきた画像や動画にVIRTUAL
                  FASHIONを着用させ、「納品する」ボタンを押してください
                  <br />
                  ・クライアントが「検収を完了する」ボタンを押したら取引が終了します
                </p>
              </div>
            </div>
          </Badge.Ribbon>
        </div>
      </section>
    </>
  );
}

export default Howtowear;

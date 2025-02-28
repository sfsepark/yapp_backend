import express from 'express';
import routes from '../routes';
import {
  getSupports,
  getPortfolio,
  addPorfolio,
  updatePortfolio,
  deletePortfolio,
  getRecruit,
  getApplicantDetail,
  getProjectCart,
  getApplicantStatus,
  acceptApplicant,
  cancelApplicant
} from '../controllers/mypageController';
import { onlyPrivate, uploadPortfolioImage } from '../middlewares';
import {
  updateKeyword,
  getMypageKeywords
} from '../controllers/keywordController';

const mypageRouter = express.Router();

mypageRouter.get(routes.keywords, onlyPrivate, getMypageKeywords);
mypageRouter.put(routes.keywords, onlyPrivate, updateKeyword);

mypageRouter.get(routes.supports, onlyPrivate, getSupports);

mypageRouter.get(routes.portfolio, onlyPrivate, getPortfolio);
mypageRouter.post(routes.portfolio, onlyPrivate, uploadPortfolioImage, addPorfolio);
mypageRouter.put(routes.portfolio, onlyPrivate, uploadPortfolioImage, updatePortfolio);
mypageRouter.delete(routes.portfolio, onlyPrivate, deletePortfolio);

mypageRouter.post(
  `${routes.recruit}${routes.projectId}`,
  onlyPrivate,
  getApplicantDetail
);
mypageRouter.get(routes.recruit, onlyPrivate, getRecruit);
mypageRouter.post(
  `${routes.recruit}${routes.projectId}${routes.accept}`,
  onlyPrivate,
  acceptApplicant);

mypageRouter.get(routes.cart, onlyPrivate, getProjectCart);
mypageRouter.get(routes.status, onlyPrivate, getApplicantStatus);
mypageRouter.delete(
  `${routes.status}${routes.cancel}`,
  onlyPrivate,
  cancelApplicant);

/**
 * @swagger
 * /mypage/keywords:
 *   put:
 *     summary: 사용자의 keywords를 업데이트
 *     tags : [Keyword]
 *     parameters:
 *         - in: body
 *           name: keywords
 *           schema:
 *               type: object
 *               properties:
 *                  keywords:
 *                    type: array
 *                    items:
 *                        type: integer
 *                    example : [1, 2, 5]
 *
 *     responses:
 *       200:
 *         description: success/fail
 *         schema:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * tags:
 *   name: Keyword
 * definitions:
 *   Keyword:
 *     type: object
 *     properties:
 *       keywordId:
 *         type: integer
 *         description: ObjectID
 *       name:
 *         type: string
 *         description: 키워드명
 */

/**
 * @swagger
 * /mypage/keywords:
 *   get:
 *     summary: Returns Keyword list
 *     tags: [Keyword]
 *     responses:
 *       200:
 *         description: Keyword list
 *         schema:
 *           type: object
 *           properties:
 *             keywordFromDb:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Keyword'
 *               example : [{keywordId: 1, name: '개발자'}]
 *             keywordFromUser:
 *                type: array
 *                items:
 *                    type: integer
 *                    example: 2, 3, 4
 */

/**
 * @swagger
 * /mypage/portfolio:
 *   get:
 *     summary: Portfolio 목록 반환
 *     tags: [My Page]
 *     responses:
 *       200:
 *         description: Portfolio list
 *         schema:
 *           type: object
 *           properties:
 *             portfolios:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Portfolio'
 *               example : [{portfolioId: 1, title: '포토폴리오1', myRole: '백엔드 개발', useStack: 'C++/Python', thumbnailImage: 'http://image.url', 'attachFile': 'http://file.url'}]
 */

/**
 * @swagger
 * /mypage/portfolio:
 *   post:
 *     summary: Portfolio 추가
 *     tags: [My Page]
 *     parameters:
 *        - in: body
 *          name: 포트폴리오 정보
 *          schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  myRole:
 *                      type: string
 *                  useStack:
 *                      type: string
 *                  thumbnailImage:
 *                      type: string
 *                  attachFile:
 *                      type: string
 *          example: {
 *              title: '포트폴리오1',
 *              myRole: '백엔드 개발',
 *              useStack: 'C++/Python',
 *              thumbnailImage: 'http://image.url',
 *              attachFile: 'http://file.url'
 *          }
 *     responses:
 *       200:
 *         description: 포트폴리오 추가 성공
 *         schema:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /mypage/portfolio:
 *   put:
 *     summary: Portfolio 업데이트
 *     tags : [My Page]
 *     parameters:
 *         - in: body
 *           name: portfolio
 *           schema:
 *               type: object
 *               properties:
 *                  portfolioId:
 *                    type: integer
 *                  title:
 *                    type: string
 *                  myRole:
 *                      type: string
 *                  useStack:
 *                      type: string
 *                  thumbnailImage:
 *                      type: string
 *                  attachFile:
 *                      type: string
 *               example: {
 *              portfolioId: 1,
 *              title: '포트폴리오1',
 *              myRole: '백엔드 개발',
 *              useStack: 'C++/Python',
 *              thumbnailImage: 'http://image.url',
 *              attachFile: 'http://file.url'
 *               }
 *     responses:
 *       200:
 *         description: success/fail
 *         schema:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /mypage/portfolio:
 *   delete:
 *     summary: Portfolio 삭제
 *     tags : [My Page]
 *     parameters:
 *         - in: body
 *           name: portfolio
 *           schema:
 *               type: object
 *               properties:
 *                  portfolioId:
 *                    type: integer
 *               example: {
 *              portfolioId: 1,
 *               }
 *     responses:
 *       200:
 *         description: success/fail
 *         schema:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /mypage/recruit:
 *   get:
 *     summary: 모집글 관리 목록과 지원자 목록 리턴(지원자 목록은 role로 정렬해서 리턴)
 *     tags: [My Page]
 *     responses:
 *       200:
 *         description: Project list and Applicant list
 *         schema:
 *           type: object
 *           properties:
 *             recruitProjects:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Project'
 *               example : [{projectId: 1, title: '모임장소 추천 서비스', step: 0, role: 5, applicants: [{userId: 3, name: '홍길동', profileImage: '', role: 1, portfolioCnt: 3},{userId: 4, name: '김철수', profileImage: '', role: 2, portfolioCnt: 1}]}]
 */

/**
 * @swagger
 * /mypage/recruit/{projectId}:
 *   post:
 *     summary: 모집글 목록에서 지원자 상세보기
 *     tags: [My Page]
 *     parameters:
 *         - in: body
 *           name: applicant
 *           schema:
 *               type: object
 *               properties:
 *                  applicantId:
 *                    type: integer
 *               example: {
 *              applicantId: 1,
 *               }
 *     responses:
 *       200:
 *         description: Applicant detail
 *         schema:
 *           type: object
 *           properties:
 *             project:
 *               type: object
 *               items:
 *               example : { title: "해커톤 팀원 모집", role: 3, interviewQuestions: [{content: "일주일에 몇 회정도 참여 가능하신가요?"},{content: "개발자와 협업 경험이 있으신가요?"}], interviewAnswers: [{content: "네 모두 참여 가능합니다."},{content: "네 동아리에서 참여한 경험이 있습니다."}]}
 *             applicant:
 *               type: object
 *               items:
 *               example : { email: "gogogo@gogo.com", name: "gogogo", profileImage: ''}
 *             portfolios:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Portfolio'
 *               example : [{portfolioId: 3, title: "portfolio~~!!!!", useStack: "spring, mybatis, mysql, jQuery", myRole: "조장역할을 맡아서 진행함!", thumbnailImage: '', attachFile: ''}, {portfolioId: 4, title: "portfolio~~!!!", useStack: "spring, mybatis, mysql, react", myRole: "프론트 부분을 맡아서 진행함.", thumbnailImage: '', attachFile: ''}]
 */

 /**
  * @swagger
  * /mypage/cart:
  *   get:
  *     summary: 사용자의 관심 프로젝트 목록 조회
  *     tags: [My Page]
  *     responses:
  *       200:
  *         description: ProjectCart list
  *         schema:
  *           type: object
  *           properties:
  *             cart:
  *               type: array
  *               items:
  *                 $ref: '#/definitions/ProjectCart'
  *               example : [{projectId: 1, title: '해커톤 팀원 모집', role: 5}, {projectId: 2, title: '프로젝트 팀원 모집', role: 4}]
  */

  /**
   * @swagger
   * /mypage/status:
   *   get:
   *     summary: 사용자의 지원 현황 조회
   *     tags: [My Page]
   *     responses:
   *       200:
   *         description: Applicant list
   *         schema:
   *           type: object
   *           properties:
   *             applicantCnt:
   *               type: integer
   *               items:
   *                 $ref: '#/definitions/Applicant'
   *                 example : 1
   *             seenCnt:
   *               type: integer
   *               items:
   *                 $ref: '#/definitions/Applicant'
   *                 example : 1
   *             acceptedCnt:
   *               type: integer
   *               items:
   *                 $ref: '#/definitions/Applicant'
   *                 example : 1
   *             list:
   *               type: array
   *               items:
   *                 $ref: '#/definitions/Applicant'
   *                 example : {projectId: 1, title: '프로젝트 팀원 모집', role: 3, isClosed: 0, seenFlag: 1, isAccepted: 0}
   */

   /**
    * @swagger
    * /mypage/recruit/{projectId}/accept:
    *   post:
    *     summary: 특정 모집글에 지원한 지원자를 승인함
    *     tags: [My Page]
    *     parameters:
    *         - in: body
    *           name: applicant
    *           schema:
    *               type: object
    *               properties:
    *                  applicantId:
    *                    type: integer
    *               example: {
    *              applicantId: 1,
    *               }
    *     responses:
    *       200:
    *         description: success/fail
    *         schema:
    *           type: boolean
    *           example: true
    */

    /**
     * @swagger
     * /mypage/status/cancel:
     *   delete:
     *     summary: 특정 프로젝트 지원 취소
     *     tags : [My Page]
     *     parameters:
     *         - in: body
     *           name: Applicant
     *           schema:
     *               type: object
     *               properties:
     *                  projectId:
     *                    type: integer
     *               example: {
     *              projectId: 1,
     *               }
     *     responses:
     *       200:
     *         description: success/fail
     *         schema:
     *           type: boolean
     *           example: true
     */

export default mypageRouter;
